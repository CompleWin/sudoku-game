import configSpriteScale from "../config/configSpriteScale.js";
import getResponsiveScale from "../responvisve/getResponsiveScale.js";

const createSpriteButton = (scene, atlasKey, textureKey, onClick) => {
    const baseScale = configSpriteScale.baseScale;
    const hoverScale = configSpriteScale.hoverScale;

    const scale = getResponsiveScale(scene,1);
    const standartScale = baseScale * scale;
    const pointOnScale = hoverScale * scale;

    const img = scene.add.image(0, 0, atlasKey, textureKey)
        .setInteractive({ useHandCursor: true })
        .setScale(standartScale);

    img.on('pointerover', () => img.setScale(pointOnScale));
    img.on('pointerout', () => img.setScale(standartScale));
    img.on('pointerup', onClick);

    return img;
}

export default createSpriteButton;