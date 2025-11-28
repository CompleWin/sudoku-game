import generateSudoku from './tools/sudoku/generateSudoku.js';
import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import path from 'path';
import {fileURLToPath} from 'url';


const PORT = 80;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

console.log(`Server starting`);

const waitingPlayers = {
    easy: [],
    medium: [],
    hard: []
};

const games = {};

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('findGame', ({difficulty}) => {
        difficulty = difficulty || 'easy';

        if (!waitingPlayers[difficulty]) {
            waitingPlayers[difficulty] = [];
        }

        const queue = waitingPlayers[difficulty];

        if (queue.length > 0) {
            const opponentSocket = queue.shift();
            const roomId = `room_${opponentSocket.id}_${socket.id}`;

            socket.join(roomId);
            opponentSocket.join(roomId);

            const {board, solution} = generateSudoku(difficulty);

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
            queue.push(socket);
            socket.emit('waitingForOpponent');
            console.log(`Socket ${socket.id} is waiting for opponent (${difficulty})`);
        }
    });

    socket.on('progressUpdate', ({roomId, emptyCells}) => {
        socket.to(roomId).emit('opponentProgress', {emptyCells});
    });

    socket.on('boardSolved', ({roomId}) => {
        const game = games[roomId];
        if (!game) {
            return;
        }

        if (!game.winner) {
            game.winner = socket.id;

            const [p1, p2] = game.players;

            io.to(p1).emit('gameResult', {
                result: p1 === socket.id ? 'win' : 'lose',
            });

            io.to(p2).emit('gameResult', {
                result: p2 === socket.id ? 'win' : 'lose',
            });

            console.log(`Game in room ${roomId} finished. Winner: ${socket.id}`);
        }
    });

    socket.on('disconnect', (reason) => {
        console.log('Client disconnected: ', socket.id, 'reason: ', reason);

        Object.keys(waitingPlayers).forEach(diff => {
            waitingPlayers[diff] = waitingPlayers[diff].filter(s => s.id !== socket.id);
        });


        for (const [roomId, game] of Object.entries(games)) {
            if (game.players.includes(socket.id) && !game.winner) {
                const opponentId = game.players.find(id => id !== socket.id);
                if (opponentId) {
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