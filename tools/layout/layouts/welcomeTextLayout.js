import configFont from "../../config/configFont.js";
import getResponsiveFontSize from "../../responvisve/getResponsiveFontSize.js";

const welcomeTextLayout = (scene) => {
    const {width, height} = scene.scale;


    scene.welcomeText.setPosition(
        width / 2,
        height / 2 - configFont.welcomeFontYOffset,
    );
    scene.welcomeText.setFontSize(
        getResponsiveFontSize(scene, 24)
    );

    //scene.welcomeText.setWordWrapWidth(panelWidth * 0.9);
}

export default welcomeTextLayout;