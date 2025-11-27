
const selectCell = (scene, row, col) => {
    // Снимаем подсветку с предыдущей клетки
    if (scene.selectedCell.row !== -1) {
        const prevRow = scene.selectedCell.row;
        const prevCol = scene.selectedCell.col;

        const prevCell = scene.cells[prevRow][prevCol];
        if (prevCell && prevCell.setFillStyle) {
            // Возвращаем прозрачность
            prevCell.setFillStyle(0xffffff, 0);
        }
    }

    // Новая выбранная клетка
    scene.selectedCell = { row, col };

    const cell = scene.cells[row][col];
    if (cell && cell.setFillStyle) {
        // ✅ Лёгкая подсветка поверх фонового спрайта
        cell.setFillStyle('#7e95fd', 0.1);
    }
};

export default selectCell;
