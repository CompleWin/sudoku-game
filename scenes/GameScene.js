import createBackgroundImage from "../tools/create/createBackgroundImage.js";
import autoLayoutEvent from "../tools/layout/autoLayoutEvent.js";
import updateLayout from "../tools/layout/updateLayout.js";
import findEmpty from "../tools/sudoku/findEmpty.js";
import shuffle from "../tools/sudoku/shuffle.js";
import configSudoku from "../tools/config/configSudoku.js";
import createSudokuGrid from "../tools/sudoku/createSudokuGrid.js";
import isValid from "../tools/sudoku/isValid.js";
import removeNumbers from "../tools/sudoku/removeNumbers.js";
import createSudokuUI from "../tools/sudoku/createSudokuUI.js";


export default class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene');
    }

    init(data) {
        this.difficulty = data.difficulty || 'easy';
    }

    create() {

        const {width, height} = this.scale;

        createBackgroundImage(this);

        this.createSudoku();

        createSudokuUI(this);

        autoLayoutEvent(this, updateLayout);

    }

    createSudoku() {

        this.solution = this.generateSudoku();

        this.board = JSON.parse(JSON.stringify(this.solution));
        removeNumbers(this.board, this.difficulty);

        this.initialCells = this.board.map(row => row.map(cell => cell !== 0));

        this.selectedCell = {row: -1, col: -1};

        createSudokuGrid(this);

    }

    generateSudoku() {

        const board = Array(9).fill(0).map(() => Array(9).fill(0));

        for (let cell = 0; cell < 3; cell++) {
            const nums = shuffle(configSudoku.digits);
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    board[cell * 3 + i][cell * 3 + j] = nums[i * 3 + j];
                }
            }
        }

        this.solveSudoku(board);
        return board;
    }

    solveSudoku(board) {
        const empty = findEmpty(board);
        if (!empty) {
            return true;
        }

        const [row, col] = empty;
        const nums = shuffle(configSudoku.digits);

        for (let num of nums) {
            if (isValid(board, row, col, num)) {
                board[row][col] = num;
                if (this.solveSudoku(board)) {
                    return true;
                }
                board[row][col] = 0;
            }
        }
        return false;

    }



}