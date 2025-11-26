import {getResponsiveFontSize, getResponsiveScale} from "./ResponsiveTools.js";
import configSpriteScale from "./configSpriteScale.js";

const fontFamily = 'Arial';

export function createButton(scene, label, onClick) {
    const container = scene.add.container(0, 0);

    const fontSize = getResponsiveFontSize(32);
    const txt = scene.add.text(0, 0, label, {
        fontFamily: fontFamily,
        fontSize: fontSize + 'px',
        color: '#ffffff'
    }).setOrigin(0.5);

    container.add(txt);
    container.setSize(txt.width, txt.height);
    container.setInteractive({ useHandCursor: true });

    container.on('pointerover', () => txt.setScale(1.1));
    container.on('pointerout',  () => txt.setScale(1.0));
    container.on('pointerup', onClick);

    return container;
}

export function createSpriteButton(scene, atlasKey, textureKey, onClick) {
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