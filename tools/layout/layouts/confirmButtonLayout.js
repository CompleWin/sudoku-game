import getResponsiveScale from "../../responvisve/getResponsiveScale.js";
import configAuth from "../../config/configAuth.js";
import getResponsiveFontSize from "../../responvisve/getResponsiveFontSize.js";
import configFont from "../../config/configFont.js";

const confirmButtonLayout = (scene) => {

    const {width, height} = scene.scale;
    const uiScale = getResponsiveScale(scene, 1);

    const inputWidthScreen = configFont.inputWidth * uiScale;
    const marginX = 30 * uiScale;

    scene.confirmButton.setScale(getResponsiveScale(scene, configAuth.confirmButtonBaseScale));

    const btnWidthScreen = scene.confirmButton.width * configAuth.confirmButtonBaseScale;
    const btnX = width / 2 - (configFont.inputWidth * uiScale * 0.25) + inputWidthScreen / 2 + marginX + btnWidthScreen / 2;
    const btnY = height / 2 + 5;

    scene.confirmButton.setPosition(btnX, btnY);
}

export default confirmButtonLayout;