
const registerSocketEvent = (socket, event, callback) => {
    socket.on(event, callback);
}

export default registerSocketEvent;