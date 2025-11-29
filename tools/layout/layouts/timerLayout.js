import getResponsiveFontSize from "../../responvisve/getResponsiveFontSize.js";
import configDifficultyButton from "../../config/configDifficultyButton.js";
import configSudokuLayout from "../../config/configSudokuLayout.js";

const timerLayout = (scene) => {
    const {width} = scene.scale;

    const fontSize = getResponsiveFontSize(scene, configSudokuLayout.timerFontSize);

    const gridY = scene.gridContainer.y;
    const gridTop = gridY - (scene.gridContainer.displayHeight) / 2;

    scene.timerText.setFontSize(fontSize);
    scene.timerText.setPosition(
        width / 2,
        gridTop - 10,
    );
}

export default timerLayout;