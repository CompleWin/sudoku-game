import selectCell from "./selectCell.js";

const createSudokuGrid = (scene) => {
    scene.gridContainer = scene.add.container(0, 0);
    scene.cellSize = 50;
    scene.cells = [];
    scene.texts = [];

    for (let row = 0; row < 9; row++) {
        scene.cells[row] = [];
        scene.texts[row] = [];

        for (let col = 0; col < 9; col++) {
            const x = col * scene.cellSize;
            const y = row * scene.cellSize;

            const cell = scene.add.rectangle(x, y, scene.cellSize, scene.cellSize, '#ffffff')
                .setOrigin(0)
                .setStrokeStyle(1, '#34495e');

            if (col % 3 === 0) {
                cell.setStrokeStyle(3, '#2c3e50', 1);
            }
            if (row % 3 === 0) {
                const thickness = cell.strokeColor === '#2c3e50' ? 3 : 1;
                cell.setStrokeStyle(thickness, '#2c3e50', 1);
            }

            cell.setInteractive({useHandCursor: true});

            cell.on('pointerup', () => { selectCell(scene, row, col) })

            scene.cells[row][col] = cell;
            scene.gridContainer.add(cell);

            if (scene.board[row][col] !== 0) {
                const num = scene.board[row][col];
                const isInitial = scene.initialCells[row][col];

                const text = scene.add.text(
                    x + scene.cellSize / 2,
                    y + scene.cellSize / 2,
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