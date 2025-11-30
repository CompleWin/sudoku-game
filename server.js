import generateSudoku from './tools/sudoku/generateSudoku.js';
import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import path from 'path';
import {fileURLToPath} from 'url';
import loadUsers from "./tools/users/loadUsers.js";
import createUserId from "./tools/users/createUserId.js";
import saveUsers from "./tools/users/saveUsers.js";
import parseCookies from "./tools/users/parseCookies.js";
import applyResultForSocket from "./tools/users/applyResultForSocket.js";



const PORT = 80;
const COOKIES_AGE = 1000 * 60 * 60 * 24 * 365;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const USERS_FILE = path.join(__dirname, 'users.json');
let users = {};

loadUsers(USERS_FILE, users);

app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/register', (req, res) => {
    const { nickname } = req.body || {};

    if (!nickname || typeof nickname !== 'string') {
        return res.status(400).json({ error: 'Nickname is required' });
    }

    const cleanName = nickname.trim();
    if (!cleanName) {
        return res.status(400).json({ error: 'Nickname is empty' });
    }

    const shortName = cleanName.slice(0, 30);
    const userId = createUserId();

    users[userId] = {
        id: userId,
        nickname: shortName,
        wins: 0,
        losses: 0,
        games: 0,
        createdAt: new Date().toISOString()
    };

    saveUsers(USERS_FILE, users);

    res.cookie('userId', userId, {
        maxAge: COOKIES_AGE,
        httpOnly: false,
        sameSite: 'lax'
    });

    res.json(users[userId]);
});

app.get('/api/me', (req, res) => {
    const cookies = parseCookies(req.headers.cookie || '');
    const userId = cookies.userId;

    if (!userId || !users[userId]) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(users[userId]);
});

console.log(`Server starting`);

const waitingPlayers = {
    easy: [],
    medium: [],
    hard: []
};

const games = {};

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    const cookies = parseCookies(socket.handshake.headers.cookie || '');
    const userId = cookies.userId;

    if (userId && users[userId]) {
        socket.data.userId = userId;
        socket.data.nickname = users[userId].nickname;
        console.log(`Socket ${socket.id} authenticated as ${users[userId].nickname} (${userId})`);
    } else {
        console.log(`Socket ${socket.id} connected without known userId`);
    }

    socket.on('findGame', ({ difficulty }) => {

        if (!waitingPlayers[difficulty]) {
            waitingPlayers[difficulty] = [];
        }

        const queue = waitingPlayers[difficulty];
        const currentUserId = socket.data.userId;

        let opponentIndex = -1;

        if (currentUserId) {
            for (let i = 0; i < queue.length; i++) {
                const candidate = queue[i];
                const candidateUserId = candidate.data && candidate.data.userId;

                if (!candidateUserId || candidateUserId !== currentUserId) {
                    opponentIndex = i;
                    break;
                }
            }
        } else {
            if (queue.length > 0) {
                opponentIndex = 0;
            }
        }

        if (opponentIndex !== -1) {
            const opponentSocket = queue.splice(opponentIndex, 1)[0];
            const roomId = `room_${opponentSocket.id}_${socket.id}`;

            socket.join(roomId);
            opponentSocket.join(roomId);

            const { board, solution } = generateSudoku(difficulty);

            games[roomId] = {
                players: [opponentSocket.id, socket.id],
                difficulty,
                board,
                solution,
                winner: null
            };

            io.to(roomId).emit('gameStarted', {
                roomId,
                board,
                solution,
            });

            console.log(`Game started in room ${roomId} (difficulty ${difficulty})`);
        } else {
            if (!queue.includes(socket)) {
                queue.push(socket);
            }

            socket.emit('waitingForOpponent');

            if (currentUserId) {
                console.log(`Socket ${socket.id} (userId=${currentUserId}) is waiting for opponent (${difficulty})`);
            } else {
                console.log(`Socket ${socket.id} is waiting for opponent (${difficulty})`);
            }
        }
    });


    socket.on('progressUpdate', ({roomId, emptyCells}) => {
        const nickname = socket.data.nickname || 'Соперник';
        socket.to(roomId).emit('opponentProgress', { emptyCells, nickname });
    });

    socket.on('boardSolved', ({roomId}) => {
        const game = games[roomId];
        if (!game) {
            return;
        }

        if (!game.winner) {
            game.winner = socket.id;

            const [p1, p2] = game.players;
            const winnerSocketId = socket.id;
            const loserSocketId = p1 === winnerSocketId ? p2 : p1;

            applyResultForSocket(io, winnerSocketId, USERS_FILE, users,'win');
            applyResultForSocket(io, loserSocketId, USERS_FILE, users, 'lose');

            io.to(winnerSocketId).emit('gameResult', { result: 'win' });
            io.to(loserSocketId).emit('gameResult', { result: 'lose' });

            delete games[roomId];

            console.log(`Game in room ${roomId} finished. Winner: ${socket.id}`);
        }
    });

    socket.on('playerMistakeLose', ({ roomId}) => {
        const game = games[roomId];
        if (!game) {
            return;
        }

        if (!game.winner) {
            const [p1, p2] = game.players;

            const loserSocketId = socket.id;
            const winnerSocketId = p1 === loserSocketId ? p2 : p1;

            game.winner = winnerSocketId;

            applyResultForSocket(io, winnerSocketId, USERS_FILE, users, 'win');
            applyResultForSocket(io, loserSocketId, USERS_FILE, users, 'lose');

            io.to(winnerSocketId).emit('gameResult', { result: 'win' });
            io.to(loserSocketId).emit('gameResult', { result: 'lose' });

            delete games[roomId];

            console.log(`Game in room ${roomId} finished. Winner (opponent made too many mistakes): ${winnerSocketId}`);
        }
    })

    socket.on('disconnect', (reason) => {
        console.log('Client disconnected: ', socket.id, 'reason: ', reason);

        Object.keys(waitingPlayers).forEach(diff => {
            waitingPlayers[diff] = waitingPlayers[diff].filter(s => s.id !== socket.id);
        });


        for (const [roomId, game] of Object.entries(games)) {
            if (game.players.includes(socket.id) && !game.winner) {
                const opponentId = game.players.find(id => id !== socket.id);
                if (opponentId) {
                    applyResultForSocket(io, opponentId, USERS_FILE, users,'win');
                    applyResultForSocket(io, socket.id, USERS_FILE, users, 'lose');
                    io.to(opponentId).emit('gameResult', { result: 'win'} );
                }
                delete games[roomId];
                console.log(`Game in room ${roomId} ended due to disconnect.`);
            }
        }

    });
});

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}...`);
})