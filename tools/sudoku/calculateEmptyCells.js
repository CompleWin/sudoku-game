
const calculateEmptyCells = (scene) => {
    if (!scene.board) {
        return 81;
    }

    let count = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (scene.board[i][j] === 0) {
                count++;
            }
        }
    }
    return count;
}

export default calculateEmptyCells;