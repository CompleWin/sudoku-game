
const selectCell = (scene, row, col) => {

    if (scene.selectedCell.row !== -1) {
        const prevRow = scene.selectedCell.row;
        const prevCol = scene.selectedCell.col;

        scene.cells[prevRow][prevCol].clearTint();
    }

    scene.selectedCell = {row, col};
    scene.cells[row][col].setTint('#e8f4f8');
}

export default selectCell;