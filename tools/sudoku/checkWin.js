import showWinMessage from "./showWinMessage.js";

const checkWin = (scene) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (scene.board[i][j] !== scene.solution[i][j]) {
                return false;
            }
        }
    }

    if (scene.isMultiplayer && scene.socket && scene.roomId) {
        if (!scene.hasSentSolved) {
            scene.hasSentSolved = true;
            scene.socket.emit('boardSolved', {roomId: scene.roomId});
        }
    } else {
        showWinMessage(scene);
    }

    return true;

}

export default checkWin;