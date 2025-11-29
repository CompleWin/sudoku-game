import createSudokuGrid from "../../sudoku/createSudokuGrid.js";
import createSudokuUI from "../../sudoku/createSudokuUI.js";
import createOpponentProgressText from "../../create/createOpponentProgressText.js";
import sendProgress from "../sendProgress.js";
import updateLayout from "../../layout/updateLayout.js";
import startTimer from "../../timer/startTimer.js";

const gameStarted = (scene) => {

    scene.socket.on('gameStarted', ({roomId, board, solution}) => {
        scene.roomId = roomId;
        scene.board = board;
        scene.solution = solution;
        scene.initialCells = board.map(row => row.map(v => v !== 0));
        scene.hasSentSolved = false;

        if (scene.waitingText) {
            scene.waitingText.destroy();
            scene.waitingText = null;
        }

        if (scene.waitingDotsEvent) {
            scene.waitingDotsEvent.remove(false);
            scene.waitingDotsEvent = null;
        }


        createSudokuGrid(scene);
        createSudokuUI(scene);
        createOpponentProgressText(scene);
        sendProgress(scene);
        updateLayout(scene);

        startTimer(scene);
    });
}

export default gameStarted;