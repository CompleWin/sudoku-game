import saveUsers from "./saveUsers.js";

const applyResultForSocket = (io, socketId, USER_FILE, users, result) => {
    const socket = io.sockets.sockets.get(socketId);
    if (!socket) return;

    const userId = socket.data.userId;
    if (!userId || !users[userId]) return;

    const u = users[userId];
    u.games = (u.games || 0) + 1;

    if (result === 'win') {
        u.wins = (u.wins || 0) + 1;
    } else if (result === 'lose') {
        u.losses = (u.losses || 0) + 1;
    }

    saveUsers(USER_FILE, users);
}

export default applyResultForSocket;