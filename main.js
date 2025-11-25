
const config = {
    type: Phaser.AUTO,
    backgroundColor: 'white',
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        PreloadScene,
        MenuScene,
    ]
};

const game = new Phaser.Game(config);