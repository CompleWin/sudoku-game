import calculateEmptyCells from "../sudoku/calculateEmptyCells.js";

const sendProgress = (scene) => {
    if (!scene.isMultiplayer || !scene.socket || !scene.roomId) {
        return;
    }

    const emptyCells = calculateEmptyCells(scene);

    scene.socket.emit('progressUpdate', {
        roomId: scene.roomId,
        emptyCells,
    });
}

export default sendProgress;