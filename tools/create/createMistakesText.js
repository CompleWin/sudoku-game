import configFont from "../config/configFont.js";
import {Language} from "../../language.js";
import configSudokuLayout from "../config/configSudokuLayout.js";

const createMistakesText = (scene) => {

    scene.mistakeText = scene.add.text(0, 0,
        `${Language.data["game"]["mistake"]}${scene.mistakes}/${scene.maxMistakes}`,
        {
            fontFamily: configFont.defaultFontFamily,
            fontSize: configSudokuLayout.miskateFontSize,
            color: configSudokuLayout.mistakeFontColor
        }
    ).setOrigin(0.5, 1);

}

export default createMistakesText;