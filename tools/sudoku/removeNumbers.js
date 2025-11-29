import configSudoku from "../config/configSudoku.js";

const removeNumbers = (board, difficulty) => {

    const cellsToRemove = configSudoku.cellsToRemove;

    const count = cellsToRemove[difficulty];
    console.log(count);
    let removed = 0;

    while (removed < count) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        if (board[row][col] !== 0) {
            board[row][col] = 0;
            removed++;
        }
    }
}

export default removeNumbers;