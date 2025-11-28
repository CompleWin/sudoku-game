import findEmpty from "./findEmpty.js";
import shuffleArray from "./shuffleArray.js";
import configSudoku from "../config/configSudoku.js";
import isValid from "./isValid.js";

const solveSudoku = (board) => {
    const empty = findEmpty(board);
    if (!empty) {
        return true;
    }

    const [row, col] = empty;
    const nums = shuffleArray(configSudoku.digits);

    for (let num of nums) {
        if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) {
                return true;
            }
            board[row][col] = 0;
        }
    }
    return false;
}

export default solveSudoku;