import getResponsiveFontSize from "../../responvisve/getResponsiveFontSize.js";
import configDifficultyButton from "../../config/configDifficultyButton.js";

const timerLayout = (scene) => {
    const {width} = scene.scale;

    const fontSize = getResponsiveFontSize(scene, configDifficultyButton.titleFontSize);
    scene.timerText.setFontSize(fontSize);
    scene.timerText.setPosition(width - 20, 20);
}

export default timerLayout;