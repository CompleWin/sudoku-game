import configSudoku from "../config/configSudoku.js";

import checkWin from "./checkWin.js";
import sendProgress from "../server/sendProgress.js";

const placeNumber = (scene, num) => {

    const { row, col } = scene.selectedCell;

    if (row === -1 || scene.initialCells[row][col]) return;

    // Удаляем старый текст
    if (scene.texts[row][col]) {
        scene.texts[row][col].destroy();
        scene.texts[row][col] = null;
    }

    // Обновляем доску
    scene.board[row][col] = num;

    // Создаем новый текст, если число не 0
    if (num !== 0) {
        const cellSize = configSudoku.baseCellSize;

        const x = col * cellSize + cellSize / 2;
        const y = row * cellSize + cellSize / 2;

        const isCorrect = num === scene.solution[row][col];

        const text = scene.add.text(x, y, num.toString(), {
            fontSize: '24px',
            color: isCorrect ? '#3498db' : '#e74c3c',
            fontFamily: 'Joystix Monospace'
        }).setOrigin(0.5);

        scene.texts[row][col] = text;
        scene.gridContainer.add(text);
    }

    if (sendProgress) {
        sendProgress(scene)
    }

    checkWin(scene);
};

export default placeNumber;
