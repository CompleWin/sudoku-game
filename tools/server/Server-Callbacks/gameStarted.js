import createSudokuGrid from "../../sudoku/createSudokuGrid.js";
import createSudokuUI from "../../sudoku/createSudokuUI.js";
import createOpponentProgressText from "../../create/createOpponentProgressText.js";
import sendProgress from "../sendProgress.js";
import updateLayout from "../../layout/updateLayout.js";
import startTimer from "../../timer/startTimer.js";

const gameStarted = (scene) => {

    scene.socket.on('gameStarted', ({roomId, board, solution, opponentNickname}) => {
        scene.roomId = roomId;
        scene.board = board;
        scene.solution = solution;
        scene.initialCells = board.map(row => row.map(v => v !== 0));
        scene.hasSentSolved = false;

        scene.opponentNickname = opponentNickname || 'соперника';

        if (scene.waitingText) {
            scene.waitingText.destroy();
            scene.waitingText = null;
        }
        if (scene.waitingDotsEvent) {
            scene.time.removeEvent(scene.waitingDotsEvent);
            scene.waitingDotsEvent = null;
        }

        createSudokuGrid(scene);
        createSudokuUI(scene);

        const emptyCells = board.reduce(
            (sum, row) => sum + row.filter(v => v === 0).length,
            0
        );
        const name = scene.opponentNickname;

        createOpponentProgressText(
            scene,
            `У ${name} осталось\n${emptyCells} свободных клеток`
        );

        sendProgress(scene);
        updateLayout(scene);

        startTimer(scene);
    });
}

export default gameStarted;