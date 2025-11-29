import getResponsiveScale from "../../responvisve/getResponsiveScale.js";
import configSudokuLayout from "../../config/configSudokuLayout.js";

const numberButtonsLayout = (scene) => {
    const { width, height } = scene.scale;

    const scale = getResponsiveScale(scene, configSudokuLayout.numbersBaseScale);

    const buttonSpacing = configSudokuLayout.numberSpacing * scale;
    const startX = width / 2 - (buttonSpacing * 4);

    const offsetBottom = configSudokuLayout.numberOffsetBottom * scale;
    const baseY = scene.gridBottomY + offsetBottom;


    scene.numberButtons.forEach((btn, i) => {
        btn.setPosition(startX + i * buttonSpacing, baseY);
    });

}

export default numberButtonsLayout;