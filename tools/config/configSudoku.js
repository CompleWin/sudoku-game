
const configSudoku = {
    // TODO вынести сюда {key: configSudoku.difficulties[0], label: 'Легкий', color: '#59c27d', hoverColor: '#afbfff'} вот это
    difficulties: ['easy', 'medium', 'hard'],
    digits: [1, 2, 3, 4, 5, 6, 7, 8, 9],

    cellsToRemove: {
        easy: 1,
        medium: 45,
        hard: 55,
    }
};


export default configSudoku;