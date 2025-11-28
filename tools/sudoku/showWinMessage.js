import createBackgroundImage from "../create/createBackgroundImage.js";
import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";
import configFont from "../config/configFont.js";

const showWinMessage = (scene, message = 'Победа!', color = '#2ecc71') => {
    const { width, height } = scene.scale;

    createBackgroundImage(scene);

    scene.add.text(width / 2, height / 2, message, {
        fontSize: getResponsiveFontSize(scene,48) + 'px',
        color: color,
        fontFamily: configFont.defaultFontFamily,
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.time.delayedCall(2000, () => {
        scene.scene.start('MenuScene');
    });
}

export default showWinMessage;