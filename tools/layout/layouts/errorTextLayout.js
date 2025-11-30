import getResponsiveFontSize from "../../responvisve/getResponsiveFontSize.js";
import configFont from "../../config/configFont.js";
import configAuth from "../../config/configAuth.js";
import getResponsiveScale from "../../responvisve/getResponsiveScale.js";

const errorTextLayout = (scene) => {
    const {width, height} = scene.scale;
    const uiScale = getResponsiveScale(scene, 1);

    const marginY = 10 * uiScale;

    const inputX = width / 2  + configAuth.inputXOffset;
    const inputY = height / 2;

    const realInputHeight = scene.inputElement.offsetHeight * uiScale;

    const errorX = inputX;
    const errorY = inputY + realInputHeight / 2 + marginY;

    scene.errorText.setPosition(errorX, errorY);
    scene.errorText.setFontSize(getResponsiveFontSize(scene, configFont.errorFontSize));
    scene.errorText.setOrigin(0.5, 0);
}

export default errorTextLayout;