import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";
import createBackButton from "../create/createBackButton.js";
import createNumberButtons from "../create/createNumberButtons.js";
import createClearButton from "../create/createClearButton.js";
import configFont from "../config/configFont.js";

const createSudokuUI = (scene) => {
    const {width, height} = scene.scale;

    const difficultyText = {
        easy: "Легкий",
        medium: "Средний",
        hard: "Сложный"
    };

    scene.titleText = scene.add.text(width / 2, 20, `Судоку - ${difficultyText[scene.difficulty]}`, {
        fontSize: getResponsiveFontSize(scene, 32) + 'px',
        color: '#ffffff',
        fontFamily: configFont.buttonsFontFamily
    }).setOrigin(0.5, 0)

    createBackButton(scene);

    createNumberButtons(scene);
    createClearButton(scene);
    


}

export default createSudokuUI;