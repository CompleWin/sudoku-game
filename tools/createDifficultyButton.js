import configDifficultyButton from "./configDifficultyButton.js";

const createDifficultyButton = (scene, label, color, hoverColor, onClick) => {
    const container = scene.add.container(0, 0);
    
    const width = configDifficultyButton.width;
    const height = configDifficultyButton.height;

    const text = scene.add.text(0, 0, label, {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: color
    }).setOrigin(0.5);

    container.add(text);
    container.setSize(width, height);
    container.setInteractive({ useHandCursor: true });

    container.on('pointerover', () => {
        container.setScale(1.05);
        text.setColor(hoverColor);
    });

    container.on('pointerout', () => {
        container.setScale(1.0);
        text.setColor(color);
    });

    container.on('pointerup', onClick);

    return container;
    
}

export default createDifficultyButton;