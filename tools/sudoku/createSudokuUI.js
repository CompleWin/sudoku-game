import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";
import createBackButton from "../create/createBackButton.js";
import createNumberButtons from "../create/createNumberButtons.js";
import createClearButton from "../create/createClearButton.js";
import configFont from "../config/configFont.js";
import {Language} from "../../language.js";
import configSudokuLayout from "../config/configSudokuLayout.js";

const createSudokuUI = (scene) => {
    const {width} = scene.scale;

    scene.titleText = scene.add.text(width / 2, 20, `${Language.data["menu"]["title"]} - ${Language.data["difficulty"][scene.difficulty]}`, {
        fontSize: getResponsiveFontSize(scene, configSudokuLayout.titleFontSize) + 'px',
        color: '#ffffff',
        fontFamily: configSudokuLayout.numbersFontFamily
    }).setOrigin(0.5, 0)

    createBackButton(scene);
    createNumberButtons(scene);
    createClearButton(scene);
    


}

export default createSudokuUI;