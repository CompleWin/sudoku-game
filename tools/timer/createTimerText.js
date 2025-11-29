import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";
import configSudokuLayout from "../config/configSudokuLayout.js";

const createTimerText = (scene) => {
    const { width } = scene.scale;

    scene.timerText = scene.add.text(
        width / 2,
        0,
        "00:00",
        {
            fontSize: getResponsiveFontSize(scene, configSudokuLayout.timerFontSize) + 'px',
            color: configSudokuLayout.timerFontColor,
            fontFamily: configSudokuLayout.numbersFontFamily
        }
    ).setOrigin(0.5, 1);
}

export default createTimerText;