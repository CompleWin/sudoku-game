import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";
import configSudokuLayout from "../config/configSudokuLayout.js";

const createTimerText = (scene, time = "00:00", height = 0) => {
    const { width } = scene.scale;

    scene.timerText = scene.add.text(
        width / 2,
        height,
        time,
        {
            fontSize: getResponsiveFontSize(scene, configSudokuLayout.timerFontSize) + 'px',
            color: configSudokuLayout.timerFontColor,
            fontFamily: configSudokuLayout.numbersFontFamily
        }
    ).setOrigin(0.5, 1);
}

export default createTimerText;