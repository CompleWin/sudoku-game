import MenuScene from './scenes/MenuScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import DifficultyScene from "./scenes/DifficultyScene.js";
import GameScene from "./scenes/GameScene.js";
import './language.js';
import AuthScene from "./scenes/AuthScene.js";
import StatsScene from "./scenes/StatsScene.js";


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
        AuthScene,
        MenuScene,
        DifficultyScene,
        GameScene,
        StatsScene,
    ],
    dom: {
        createContainer: true,
    }
};

// Грузим веб-шрифт до первого рендера Phaser: на устройствах без установленного
// Joystix canvas иначе нарисует текст запасным шрифтом и не перерисует его.
const startGame = () => new Phaser.Game(config);

if (document.fonts && document.fonts.load) {
    Promise.all([
        document.fonts.load('16px "Joystix Monospace"'),
        document.fonts.load('bold 16px "Joystix Monospace"')
    ])
        .then(() => document.fonts.ready)
        .then(startGame)
        .catch(startGame);
} else {
    startGame();
}