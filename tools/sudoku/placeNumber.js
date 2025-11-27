import checkWin from "./checkWin.js";
import configSudoku from "../config/configSudoku.js";

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

    // Создаем новый текст
    if (num !== 0) {
        const cellSize = configSudoku.baseCellSize;

        const x = col * cellSize + cellSize / 2;
        const y = row * cellSize + cellSize / 2;

        const isCorrect = num === scene.solution[row][col];

        const text = scene.add.text(x, y, num.toString(), {
            fontSize: '24px',
            color: isCorrect ? '#3498db' : '#e74c3c',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        scene.texts[row][col] = text;
        scene.gridContainer.add(text);
    }

    // Проверяем победу
    checkWin(scene);
}

export default placeNumber;