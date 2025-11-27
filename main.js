import MenuScene from './scenes/MenuScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import DifficultyScene from "./scenes/DifficultyScene.js";
import GameScene from "./scenes/GameScene.js";
import './language.js';


const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;


const config = {
    type: Phaser.AUTO,
    backgroundColor: 'white',
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        min: {
            width: 320,
            height: 180
        },
        max: {
            width: 2560,
            height: 1440
        }
    },
    parent: 'game-container',
    scene: [
        PreloadScene,
        MenuScene,
        DifficultyScene,
        GameScene,
    ]
};

const game = new Phaser.Game(config);