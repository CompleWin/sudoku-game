import showWinMessage from "./showWinMessage.js";

const checkWin = (scene) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (scene.board[i][j] !== scene.solution[i][j]) return;
        }
    }

    showWinMessage(scene);
}

export default checkWin;