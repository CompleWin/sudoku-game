import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";
import createBackButton from "../create/createBackButton.js";
import createNumberButtons from "../create/createNumberButtons.js";
import createClearButton from "../create/createClearButton.js";
import configFont from "../config/configFont.js";
import {Language} from "../../language.js";
import configSudokuLayout from "../config/configSudokuLayout.js";
import createTimerText from "../timer/createTimerText.js";
import configSudoku from "../config/configSudoku.js";
import createMistakesText from "../create/createMistakesText.js";

const createSudokuUI = (scene) => {
    const {width} = scene.scale;

    scene.isGameOver = false;

    scene.titleText = scene.add.text(width / 2, 20, `${Language.data["menu"]["title"]} - ${Language.data["difficulty"][scene.difficulty]}`, {
        fontSize: getResponsiveFontSize(scene, configSudokuLayout.titleFontSize) + 'px',
        color: '#ffffff',
        fontFamily: configSudokuLayout.numbersFontFamily
    }).setOrigin(0.5, 0)

    createTimerText(scene);

    createBackButton(scene);
    createNumberButtons(scene);
    createClearButton(scene);

    scene.mistakes = 0;
    scene.maxMistakes = configSudoku.mistakesLimits[scene.difficulty];

    createMistakesText(scene);


}

export default createSudokuUI;