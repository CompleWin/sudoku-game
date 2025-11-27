import placeNumber from "../sudoku/placeNumber.js";

const createClearButton = (scene) => {
    scene.clearButton = scene.add.text(0, 0, 'Очистить', {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'Arial',
        backgroundColor: '#e74c3c',
        padding: { x: 12, y: 8 }
    }).setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

    scene.clearButton.on('pointerover', () => scene.clearButton.setBackgroundColor('#c0392b'));
    scene.clearButton.on('pointerout', () => scene.clearButton.setBackgroundColor('#e74c3c'));
    scene.clearButton.on('pointerup', () => placeNumber(scene,0));
}

export default createClearButton;