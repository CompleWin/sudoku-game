import shuffleArray from "./shuffleArray.js";
import configSudoku from "../config/configSudoku.js";
import solveSudoku from "./solveSudoku.js";
import createEmptyBoard from "./createEmptyBoard.js";
import removeNumbers from "./removeNumbers.js";

const generateSudoku = (difficulty) => {

    const board = createEmptyBoard();
    solveSudoku(board);

    const solution = board.map(row => row.slice());
    removeNumbers(board, difficulty);
    return {board, solution};
}

export default generateSudoku;