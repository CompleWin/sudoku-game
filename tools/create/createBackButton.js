import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";

const createBackButton = (scene) => {
    scene.backButton = scene.add.text(20, 20, '← Назад', {
        fontSize: getResponsiveFontSize(scene, 20) + 'px',
        color: '#ffffff',
        fontFamily: 'Arial'
    })
        .setOrigin(0)
        .setInteractive({ useHandCursor: true });

    scene.backButton.on('pointerover', () => scene.backButton.setColor('#3498db'));
    scene.backButton.on('pointerout', () => scene.backButton.setColor('#ffffff'));
    scene.backButton.on('pointerup', () => scene.scene.start('MenuScene'));
}

export default createBackButton;