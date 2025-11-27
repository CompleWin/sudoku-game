import getResponsiveScale from "../tools/responvisve/getResponsiveScale.js";
import getResponsiveFontSize from "../tools/responvisve/getResponsiveFontSize.js";
import createSpriteButton  from "../tools/create/createSpriteButton.js";
import createBackgroundImage from "../tools/create/createBackgroundImage.js";
import configSpriteScale from "../tools/config/configSpriteScale.js";
import updateLayout from "../tools/updateLayout.js";
import Language from "../language.js";
import autoLayoutEvent from "../tools/layout/autoLayoutEvent.js";

export default class MenuScene extends Phaser.Scene {

    constructor() {
        super('MenuScene');
    }

    create() {
        const { width, height } = this.scale;

        // this.bg = this.add.image(0, 0, 'bg_menu')
        //     .setOrigin(0)
        //     .setDisplaySize(width, height);

        createBackgroundImage(this);
        
        this.languageChange();

        const titleFontSize = getResponsiveFontSize(this, 80);
        
        const currentLanguage = (localStorage.getItem('lang') || 'ru').toLowerCase();
        
        this.titleSprite = this.add.image(
            width / 2,
            height * configSpriteScale.titleOffset,
            'logo',
            `logo_${currentLanguage}.png`
        ).setOrigin(0.5);
        
        const scale = getResponsiveFontSize(this, 1);
        this.titleSprite.setScale(configSpriteScale.titleBaseScale * scale);
        
        this.menuButtons = [];

        if (currentLanguage === 'ru') {
            const menuItemsRu = [
                {atlasKey: "uiButtons", key: "play_ru.png", scene: "DifficultyScene"},
                {atlasKey: "uiButtons", key: "settings_ru.png", scene: ""},
                {atlasKey: "uiButtons", key: "stats_ru.png", scene: ""},
            ];

            menuItemsRu.forEach((item) => {
                const container = createSpriteButton(this, item.atlasKey, item.key, () => {
                    this.scene.start(item.scene);
                });
                this.menuButtons.push(container);
            });
        } 
        else {
            const menuItemsEn = [
                {atlasKey: "uiButtons", key: "play_en.png", scene: "DifficultyScene"},
                {atlasKey: "uiButtons", key: "settings_en.png", scene: ""},
                {atlasKey: "uiButtons", key: "stats_en.png", scene: ""},
            ];

            menuItemsEn.forEach((item) => {
                const container = createSpriteButton(this, item.atlasKey, item.key, () => {
                    this.scene.start(item.scene);
                });
                this.menuButtons.push(container);
            });
        }

        
        autoLayoutEvent(this, updateLayout);
    }
    
    languageChange = () => {
        const { width } = this.scale;
        const paddingX = getResponsiveFontSize(this, 20);
        const paddingY = getResponsiveFontSize(this, 20);
        const fontSize = getResponsiveFontSize(this, 18);

        var languageToChange = localStorage.getItem('lang') === 'ru' ? 'EN' : 'RU';

        this.langButton = this.add.image(0, 0, 'langUI', `${languageToChange.toLowerCase()}.png`)
            .setOrigin(1, 0)
            .setPosition(width - paddingX, paddingY);

        this.langButton.setInteractive({ useHandCursor: true });

        this.langButton.on('pointerover', () => {
            
        })

        this.langButton.on('pointerout', () => {
            
        })

        this.langButton.on('pointerup', () => {
            localStorage.setItem("lang", languageToChange.toLowerCase());
            location.reload();
        });
    }
}