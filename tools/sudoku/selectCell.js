
const selectCell = (scene, row, col) => {

    if (scene.selectedCell.row !== -1) {
        const prevRow = scene.selectedCell.row;
        const prevCol = scene.selectedCell.col;

        scene.cells[prevRow][prevCol].setFillStyle('#ffffff');
    }

    scene.selectedCell = {row, col};
    scene.cells[row][col].setFillStyle('#e8f4f8');
}

export default selectCell;