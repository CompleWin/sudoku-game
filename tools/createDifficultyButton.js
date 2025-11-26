import configDifficultyButton from "./configDifficultyButton";

const createDifficultyButton = (scene, label, color, hoverColor, onClick) => {
    const container = scene.add.container(0, 0);
    
    const width = configDifficultyButton.width;
    const height = configDifficultyButton.height;

    const text = this.add.text(0, 0, label, {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#ffffff'
    }).setOrigin(0.5);

    container.add(text);
    container.setSize(width, height);
    container.setInteractive({ useHandCursor: true });

    container.on('pointerover', () => {
        container.setScale(1.05);
    });

    container.on('pointerout', () => {
        container.setScale(1.0);
    });

    container.on('pointerup', onClick);

    return container;
    
}

export default createDifficultyButton;