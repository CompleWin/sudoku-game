import placeNumber from "../sudoku/placeNumber.js";
import configFont from "../config/configFont.js";
import configSudokuLayout from "../config/configSudokuLayout.js";
import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";
import sendProgress from "../server/sendProgress.js";
import checkSolvedAndSend from "../sudoku/checkSolvedAndSend.js";

const createNumberButton = (scene) => {

    scene.numberButtons = [];

    for (let i = 1; i <= 9; i++) {
        const btn = scene.add.text(0, 0, i.toString(), {
            fontSize: getResponsiveFontSize(scene, configSudokuLayout.numbersFontSize),
            color: '#000000',
            fontFamily: configSudokuLayout.numbersFontFamily,
            backgroundColor: '#e6ecfd',
            padding: {x: 12, y: 8}
        }).setOrigin(0.5)
            .setInteractive({useHandCursor: true});

        btn.on('pointerover', () => btn.setBackgroundColor('#7e95fd'));
        btn.on('pointerout', () => btn.setBackgroundColor('#e4eafb'));
        btn.on('pointerup', () => {
            placeNumber(scene, i);
        });

        scene.numberButtons.push(btn);
    }


}

export default createNumberButton;