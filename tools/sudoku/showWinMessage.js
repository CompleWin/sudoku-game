import createBackgroundImage from "../create/createBackgroundImage.js";
import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";

const showWinMessage = (scene) => {
    const { width, height } = scene.scale;

    createBackgroundImage(scene);

    const text = scene.add.text(width / 2, height / 2, 'Победа!', {
        fontSize: getResponsiveFontSize(48) + 'px',
        color: '#2ecc71',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.time.delayedCall(2000, () => {
        scene.scene.start('MenuScene');
    });
}

export default showWinMessage;