
const isBoardSolved = (board, solution) => {
    if (!board || !solution) return false;

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] !== solution[r][c]) {
                return false;
            }
        }
    }
    return true;
};

export default isBoardSolved;