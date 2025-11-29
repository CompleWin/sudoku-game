import createBackgroundImage from "./createBackgroundImage.js";
import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";
import configFont from "../config/configFont.js";
import createBackButton from "./createBackButton.js";

const createCenterText = (scene, message, color, fontSize = 48, fontStyle = 'normal') => {
    const { width, height } = scene.scale;

    createBackgroundImage(scene);

    scene.add.text(width / 2, height / 2, message, {
        fontSize: getResponsiveFontSize(scene,fontSize) + 'px',
        color: color,
        fontFamily: configFont.defaultFontFamily,
        fontStyle: fontStyle
    }).setOrigin(0.5);

    createBackButton(scene);
}

export default createCenterText;