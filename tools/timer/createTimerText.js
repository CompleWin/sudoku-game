import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";
import configSudokuLayout from "../config/configSudokuLayout.js";

const createTimerText = (scene) => {
    const { width } = scene.scale;

    scene.timerText = scene.add.text(
        width - 20,
        20,
        "00:00",
        {
            fontSize: getResponsiveFontSize(scene, configSudokuLayout.timerFontSize) + 'px',
            color: '#ffffff',
            fontFamily: configSudokuLayout.numbersFontFamily
        }
    ).setOrigin(1, 0);
}

export default createTimerText;