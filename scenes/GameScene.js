import createBackgroundImage from "../tools/create/createBackgroundImage.js";
import autoLayoutEvent from "../tools/layout/autoLayoutEvent.js";
import updateLayout from "../tools/layout/updateLayout.js";
import shuffleArray from "../tools/sudoku/shuffleArray.js";
import configSudoku from "../tools/config/configSudoku.js";
import createSudokuGrid from "../tools/sudoku/createSudokuGrid.js";
import removeNumbers from "../tools/sudoku/removeNumbers.js";
import solveSudoku from "../tools/sudoku/solveSudoku.js";
import createWaitingText from "../tools/create/createWaitingText.js";
import registerSocketHandlers from "../tools/server/registerSocketHandlers.js";
import createSudokuUI from "../tools/sudoku/createSudokuUI.js";


export default class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene');

        this.board = null;
        this.solution = null;
        this.initialCells = null;

        this.cells = [];
        this.texts = [];
        this.selectedCell = { row: -1, col: -1 };

        // Multiplayer fields

        this.socket = null;
        this.roomId = null;

        this.isMultiplayer = false;
        this.hasSentSolved = false;

        this.waitingText = null;
        this.opponentProgressText = null;
    }

    init(data) {
        this.difficulty = (data && data.difficulty) || 'easy';
        this.isMultiplayer = data.isMultiplayer;
    }

    create() {

        console.log(this.isMultiplayer);

        createBackgroundImage(this);

        if (this.isMultiplayer) {
            createWaitingText(this);

            this.socket = io();

            registerSocketHandlers(this);


            this.socket.emit('findGame', {
                difficulty: this.difficulty,
            });
        } else {
            this.createSudoku();
            createSudokuUI(this);
        }

        autoLayoutEvent(this, updateLayout);

        this.events.on('shutdown', () => {
            if (this.socket) {
                this.socket.disconnect();
                this.socket = null;
            }
        });

    }

    createSudoku() {

        this.solution = this.generateSudoku();

        this.board = JSON.parse(JSON.stringify(this.solution));
        removeNumbers(this.board, this.difficulty);

        this.initialCells = this.board.map(row => row.map(cell => cell !== 0));

        createSudokuGrid(this);

    }

    generateSudoku() {

        const board = Array(9).fill(0).map(() => Array(9).fill(0));

        for (let cell = 0; cell < 3; cell++) {
            const nums = shuffleArray(configSudoku.digits);
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    board[cell * 3 + i][cell * 3 + j] = nums[i * 3 + j];
                }
            }
        }

        solveSudoku(board);
        return board;
    }



}