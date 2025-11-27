
const removeNumbers = (board, difficulty) => {

    console.log(difficulty);

    const cellsToRemove = {
        easy: 30,
        medium: 45,
        hard: 55
    };

    const count = cellsToRemove[difficulty];
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