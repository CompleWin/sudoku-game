import selectCell from "./selectCell.js";
import configFont from "../config/configFont.js";
import configSudoku from "../config/configSudoku.js";

const createSudokuGrid = (scene) => {

    scene.gridContainer = scene.add.container(0, 0);

    const gridBg = scene.add.image(0, 0, 'sudokuGrid').setOrigin(0);
    scene.gridContainer.add(gridBg);
    scene.gridBackground = gridBg;

    const baseCellSize = gridBg.width / 9;
    scene.baseCellSize = baseCellSize;

    configSudoku.baseCellSize = baseCellSize;

    scene.cells = [];
    scene.texts = [];

    for (let row = 0; row < 9; row++) {
        scene.cells[row] = [];
        scene.texts[row] = [];

        for (let col = 0; col < 9; col++) {
            const x = col * baseCellSize;
            const y = row * baseCellSize;

            const cell = scene.add.rectangle(
                x + baseCellSize / 2,
                y + baseCellSize / 2,
                baseCellSize,
                baseCellSize,
                0x000000,
                0
            );

            cell.setInteractive({ useHandCursor: true });
            cell.on('pointerup', () => {

                if (scene.initialCells && scene.initialCells[row][col]) {
                    return;
                }

                selectCell(scene, row, col);
            });

            scene.cells[row][col] = cell;
            scene.gridContainer.add(cell);

            if (scene.board[row][col] !== 0) {
                const num = scene.board[row][col];
                const isInitial = scene.initialCells[row][col];

                const text = scene.add.text(
                    x + baseCellSize / 2,
                    y + baseCellSize / 2,
                    num.toString(),
                    {
                        fontSize: configFont.cellFontSize,
                        color: isInitial ? '#2c3e50' : '#3498db',
                        fontFamily: configFont.cellFontFamily,
                        fontStyle: isInitial ? 'bold' : 'normal'
                    }
                ).setOrigin(0.5);

                scene.texts[row][col] = text;
                scene.gridContainer.add(text);
            }
        }
    }
};

export default createSudokuGrid;
