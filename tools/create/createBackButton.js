import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";
import configFont from "../config/configFont.js";

const createBackButton = (scene) => {
    scene.backButton = scene.add.text(20, 20, '← Назад', {
        fontSize: getResponsiveFontSize(scene, 20) + 'px',
        color: '#ffffff',
        fontFamily: configFont.buttonsFontFamily
    })
        .setOrigin(0)
        .setInteractive({ useHandCursor: true });

    scene.backButton.on('pointerover', () => scene.backButton.setColor('#3498db'));
    scene.backButton.on('pointerout', () => scene.backButton.setColor('#ffffff'));
    scene.backButton.on('pointerup', () => {
        if (scene.scene.key === 'GameScene' && window.confirm("Вы уверены?")) {
            scene.scene.start('MenuScene');
        }
        else {
            scene.scene.start('MenuScene');
        }
    });
}

export default createBackButton;