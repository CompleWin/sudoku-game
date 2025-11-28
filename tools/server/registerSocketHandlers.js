import createSudokuGrid from "../sudoku/createSudokuGrid.js";
import createSudokuUI from "../sudoku/createSudokuUI.js";
import createWaitingText from "../create/createWaitingText.js";
import createOpponentProgressText from "../create/createOpponentProgressText.js";
import sendProgress from "./sendProgress.js";
import showWinMessage from "../sudoku/showWinMessage.js";
import updateLayout from "../layout/updateLayout.js";
import createBackButton from "../create/createBackButton.js";

const registerSocketHandlers = (scene) => {

    if (!scene.socket) {
        return;
    }

    scene.socket.on('waitingForOpponent', () => {
        if (scene.waitingText) {
            scene.waitingText.setText(`Ожиадание второго игрока...`);
            createBackButton(scene);
        }
    });

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

        const { width } = scene.scale;

        createOpponentProgressText(scene);

        sendProgress(scene);

        updateLayout(scene);
    });

    scene.socket.on('opponentProgress', ({emptyCells}) => {
        if (scene.opponentProgressText) {
            scene.opponentProgressText.setText(
                `У соперника осталось\n${emptyCells} свободных клеток`
            );
        }
    });

    scene.socket.on('gameResult', ({result}) => {
        if (result === 'win') {
            showWinMessage(scene);
        } else if (result === 'lose') {
            showWinMessage(scene, 'Поражение', '#e74c3c');
        } else {
            showWinMessage(scene, 'Игра окончена', '#ffffff');
        }
    });

    scene.socket.on('disconnect', (reason) => {
        console.log(`Socket disconnected: ${reason}`);

        const isManual =
            reason === 'io client disconnect' ||
            reason === 'server namespace disconnect';

        if (!scene.hasSentSolved && !isManual) {
            showWinMessage(scene, 'Соединение потеряно', '#e67e22');
        }
    })
}

export default registerSocketHandlers;