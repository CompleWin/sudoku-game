import createBackgroundImage from "../create/createBackgroundImage.js";
import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";

const showWinMessage = (scene, message = 'Победа!', color = '#2ecc71') => {
    const { width, height } = scene.scale;

    createBackgroundImage(scene);

    const text = scene.add.text(width / 2, height / 2, message, {
        fontSize: getResponsiveFontSize(scene,48) + 'px',
        color: color,
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.time.delayedCall(2000, () => {
        scene.scene.start('MenuScene');
    });
}

export default showWinMessage;