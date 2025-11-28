
const createEmptyBoard = () => {
    const board = [];
    for (let i = 0; i < 9; i++) {
        board.push(new Array(9).fill(0))
    }
    return board;
}

export default createEmptyBoard;