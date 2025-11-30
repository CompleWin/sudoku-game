const clearHighlights = (scene) => {
    if (!scene.cells) return;

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const cell = scene.cells[r] && scene.cells[r][c];
            if (cell && cell.setFillStyle) {
                cell.setFillStyle(0xffffff, 0);
            }
        }
    }
};

const selectCell = (scene, row, col) => {
    if (!scene.selectedCell) {
        scene.selectedCell = { row: -1, col: -1 };
    }

    const fillStyle = 0x7e95fd;

    clearHighlights(scene);

    scene.selectedCell = { row, col };

    const cell = scene.cells[row][col];
    if (cell && cell.setFillStyle) {
        cell.setFillStyle(0x7e95fd, 0.55);
    }

    const textObj = scene.texts[row][col];
    if (!textObj || !textObj.text) {
        return;
    }

    const value = textObj.text;

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const t = scene.texts[r][c];
            const cell2 = scene.cells[r][c];

            if (!t || !t.text || !cell2 || !cell2.setFillStyle) continue;

            if (t.text === value) {
                const alpha = (r === row && c === col) ? 0.55 : 0.25;
                cell2.setFillStyle(fillStyle, alpha);
            }
        }
    }
};

export default selectCell;
