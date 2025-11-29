import checkWin from "./checkWin.js";
import sendProgress from "../server/sendProgress.js";
import configSudokuLayout from "../config/configSudokuLayout.js";
import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";

const placeNumber = (scene, num) => {

    const { row, col } = scene.selectedCell;

    if (row === -1 || scene.initialCells[row][col]) return;


    if (scene.texts[row][col]) {
        scene.texts[row][col].destroy();
        scene.texts[row][col] = null;
    }


    scene.board[row][col] = num;


    if (num !== 0) {

        const cellSize = scene.baseCellSize;

        const x = col * cellSize + cellSize / 2;
        const y = row * cellSize + cellSize / 2;

        const isCorrect = num === scene.solution[row][col];

        const text = scene.add.text(x, y, num.toString(), {
            fontSize: configSudokuLayout.cellFontSize,
            color: isCorrect ? '#3498db' : '#e74c3c',
            fontFamily: 'Joystix Monospace'
        }).setOrigin(0.5);

        scene.texts[row][col] = text;
        scene.gridContainer.add(text);
    }

    sendProgress(scene);


    checkWin(scene);
};

export default placeNumber;
