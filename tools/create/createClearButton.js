import placeNumber from "../sudoku/placeNumber.js";
import configFont from "../config/configFont.js";
import {getLanguage} from "../../language.js";

const createClearButton = (scene) => {

    let text = getLanguage() === 'ru' ? 'очистить' : 'clear';

    scene.clearButton = scene.add.text(0, 0, text, {
        fontSize: configFont.clearButtonFontSize,
        color: '#000000',
        fontFamily: configFont.buttonsFontFamily,
        backgroundColor: '#fd5959',
        padding: { x: 12, y: 12 }
    }).setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

    scene.clearButton.on('pointerover', () => scene.clearButton.setBackgroundColor('#cb4848'));
    scene.clearButton.on('pointerout', () => scene.clearButton.setBackgroundColor('#fd5959'));
    scene.clearButton.on('pointerup', () => placeNumber(scene,0));
}

export default createClearButton;