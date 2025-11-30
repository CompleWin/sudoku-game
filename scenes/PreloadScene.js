import {getLanguage, Language} from "../language.js";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }
    
    preload() {
        const lang = getLanguage();
        
        this.load.json("lang", `assets/languages/${lang}.json`);
        this.load.image('bg_menu', '../assets/bg_solid.png');


        this.load.atlas(
            'uiButtons',
            '../assets/ui-buttons.png',
            '../assets/ui-buttons.json',
        )
        
        this.load.atlas(
            'logo',
            '../assets/logo2.png',
            '../assets/logo2.json',
        )
        
        this.load.atlas(
            'langUI',
            '../assets/lang_small.png',
            '../assets/lang_small.json',
        )

        this.load.atlas(
            'uiButtonsHover',
            '../assets/ui-buttons-hover.png',
            '../assets/ui-buttons-hover.json',
        )

        this.load.image('playButton', '../assets/play-button.png');
        this.load.image('multiplayerButton', '../assets/multiplayer-button.png');

        this.load.image('sudokuGrid', '../assets/sudokuGrid.png');
    }
    
    create() {
        Language.data = this.cache.json.get("lang");

        const hasUserIdCookie = document.cookie.split(';').some(c => c.trim().startsWith('userId='));

        if (hasUserIdCookie) {
            this.scene.start('MenuScene');
        } else {
            this.scene.start('AuthScene');
        }

    }
}