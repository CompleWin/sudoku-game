import selectCell from "./selectCell.js";

const createSudokuGrid = (scene) => {
    scene.gridContainer = scene.add.container(0, 0);

    // Базовый размер клетки (логический, без учёта масштаба)
    const cellSize = scene.baseCellSize || 50;

    scene.cells = [];
    scene.texts = [];

    for (let row = 0; row < 9; row++) {
        scene.cells[row] = [];
        scene.texts[row] = [];

        for (let col = 0; col < 9; col++) {
            const x = col * cellSize;
            const y = row * cellSize;

            // ✅ КЛЕТКА — ЭТО СПРАЙТ
            const cell = scene.add.sprite(x, y, 'sudokuCell')
                .setOrigin(0)                         // левый верхний угол
                .setDisplaySize(cellSize, cellSize);  // подгоняем под размер логической клетки

            cell.setInteractive({ useHandCursor: true });

            cell.on('pointerup', () => {
                selectCell(scene, row, col);
            });

            scene.cells[row][col] = cell;
            scene.gridContainer.add(cell);

            // ✅ ПЕРВОНАЧАЛЬНЫЕ ЦИФРЫ
            if (scene.board[row][col] !== 0) {
                const num = scene.board[row][col];
                const isInitial = scene.initialCells[row][col];

                const text = scene.add.text(
                    x + cellSize / 2,
                    y + cellSize / 2,
                    num.toString(),
                    {
                        fontSize: '24px',
                        color: isInitial ? '#2c3e50' : '#3498db',
                        fontFamily: 'Arial',
                        fontStyle: isInitial ? 'bold' : 'normal'
                    }
                ).setOrigin(0.5);

                scene.texts[row][col] = text;
                scene.gridContainer.add(text);
            }
        }
    }

}

export default createSudokuGrid;