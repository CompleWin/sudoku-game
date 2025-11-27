import placeNumber from "../sudoku/placeNumber.js";

const createNumberButton = (scene) => {

    scene.numberButtons = [];

    for (let i = 1; i <= 9; i++) {
        const btn = scene.add.text(0, 0, i.toString(), {
            fontSize: '24px',
            color: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#3498db',
            padding: {x: 12, y: 8}
        }).setOrigin(0.5)
            .setInteractive({useHandCursor: true});

        btn.on('pointerover', () => btn.setBackgroundColor('#2980b9'));
        btn.on('pointerout', () => btn.setBackgroundColor('#3498db'));
        btn.on('pointerup', () => placeNumber(scene, i));

        scene.numberButtons.push(btn);
    }


}

export default createNumberButton;