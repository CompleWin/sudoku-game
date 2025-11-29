import configDifficultyButton from "../config/configDifficultyButton.js";
import configFont from "../config/configFont.js";
import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";

const createButton = (scene, label, fontSize, width, height, color, hoverColor, onClick) => {
    const container = scene.add.container(0, 0);

    const responsiveFontSize = getResponsiveFontSize(scene, fontSize);


    const text = scene.add.text(0, 0, label, {
        fontFamily: configFont.buttonsFontFamily,
        fontSize: responsiveFontSize,
        color: color
    }).setOrigin(0.5);

    container.add(text);

    container._baseScaleX = container.scaleX;
    container._baseScaleY = container.scaleY;

    container.setSize(width, height);

    container.setInteractive({ useHandCursor: true });

    container.on('pointerover', () => {
        const baseX = container._baseScaleX;
        const baseY = container._baseScaleY;

        container.setScale(baseX * 1.05, baseY * 1.05);
        text.setColor(hoverColor);
    });

    container.on('pointerout', () => {
        const baseX = container._baseScaleX;
        const baseY = container._baseScaleY;
        container.setScale(baseX, baseY);
        text.setColor(color);
    });

    container.on('pointerup', onClick);

    return container;
    
}

export default createButton;