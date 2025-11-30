import getResponsiveScale from "../../responvisve/getResponsiveScale.js";
import configAuth from "../../config/configAuth.js";
import getResponsiveFontSize from "../../responvisve/getResponsiveFontSize.js";
import configFont from "../../config/configFont.js";

const inputLayout = (scene) => {
    const {width, height} = scene.scale;
    const uiScale = getResponsiveScale(scene, 1);
    const fontSizePx = getResponsiveFontSize(scene, configFont.inputFontSize);

    const inputX = width / 2  + configAuth.inputXOffset;
    const inputY = height / 2;

    scene.inputDom.setPosition(inputX, inputY);
    scene.inputElement.style.fontSize = `${fontSizePx}px`;
    scene.inputElement.style.transform = `scale(${uiScale})`;
    scene.inputElement.style.transformOrigin = 'center center';
}

export default inputLayout;