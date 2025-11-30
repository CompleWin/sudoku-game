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

    clearHighlights(scene);

    const fillColor = 0x7e95fd;
    const mainAlpha = 0.65;
    const secondAlpha = 0.4;
    const thirdAlpha = 0.15;

    scene.selectedCell = { row, col };

    const cell = scene.cells[row][col];
    if (cell && cell.setFillStyle) {

        cell.setFillStyle(fillColor, mainAlpha);
    }


    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const cell2 = scene.cells[r] && scene.cells[r][c];
            if (!cell2 || !cell2.setFillStyle) continue;


            if (r === row || c === col) {

                if (r === row && c === col) continue;


                cell2.setFillStyle(fillColor, thirdAlpha);
            }
        }
    }

    const textObj = scene.texts[row][col];
    if (!textObj || !textObj.text) {
        return;
    }

    const value = textObj.text;


    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const t = scene.texts[r][c];
            const cell2 = scene.cells[r] && scene.cells[r][c];

            if (!t || !t.text || !cell2 || !cell2.setFillStyle) continue;

            if (t.text === value) {

                if (r === row && c === col) {
                    cell2.setFillStyle(fillColor, mainAlpha);
                } else {

                    cell2.setFillStyle(fillColor, secondAlpha);
                }
            }
        }
    }
};

export default selectCell;
