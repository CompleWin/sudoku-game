import createSudokuGrid from "../../sudoku/createSudokuGrid.js";
import createSudokuUI from "../../sudoku/createSudokuUI.js";
import createOpponentProgressText from "../../create/createOpponentProgressText.js";
import sendProgress from "../sendProgress.js";
import updateLayout from "../../layout/updateLayout.js";

const gameStarted = (scene) => {

    scene.socket.on('gameStarted', ({roomId, board, solution}) => {
        scene.roomId = roomId;
        scene.board = board;
        scene.solution = solution;
        scene.initialCells = board.map(row => row.map(v => v !== 0));

        if (scene.waitingText) {
            scene.waitingText.destroy();
            scene.waitingText = null;
        }

        createSudokuGrid(scene);
        createSudokuUI(scene);
        createOpponentProgressText(scene);
        sendProgress(scene);
        updateLayout(scene);
    });
}

export default gameStarted;