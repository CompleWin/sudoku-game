import isBoardSolved from "./isBoardSolved.js";
import showWinMessage from "./showWinMessage.js";

const checkSolvedAndSend = (scene) => {
    if (!scene) return;

    if (scene.hasSentSolved) return;

    if (!scene.solution) return;

    if (!isBoardSolved(scene.board, scene.solution)) return;

    scene.hasSentSolved = true;

    if (scene.isMultiplayer && scene.socket && scene.roomId) {
        scene.socket.emit('boardSolved', {roomId: scene.roomId});
    } else {
         showWinMessage(scene);
    }
};

export default checkSolvedAndSend;