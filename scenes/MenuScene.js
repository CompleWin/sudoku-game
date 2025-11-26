import { getResponsiveScale, getResponsiveFontSize} from "../tools/ResponsiveTools.js";
import Language from "../language.js";


export default class MenuScene extends Phaser.Scene {

    constructor() {
        super('MenuScene');
    }

    create() {
        const { width, height } = this.scale;

        this.bg = this.add.image(0, 0, 'bg_menu')
            .setOrigin(0)
            .setDisplaySize(width, height);

        this.languageChange();

        const titleFontSize = getResponsiveFontSize(this, 80);
        
        this.titleText = this.add.text(width / 2, height * 0.2, Language.t("menu.title"), {
            fontFamily: 'Arial',
            fontSize: titleFontSize + 'px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.menuButtons = [];

        const menuItems = [
            {key: "playButton", scene: "DifficultyScene"},
            {key: "multiplayerButton", scene: ""},
        ];

        menuItems.forEach((item) => {
            const container = this.createSpriteButton(item.key, () => {
                this.scene.start(item.scene);
            });
            this.menuButtons.push(container);
        });

        this.updateLayout(this.scale.gameSize);

        this.scale.on('resize', this.updateLayout, this);
    }
    
    createButton = (label, onClick) => {
        const container = this.add.container(0, 0);

        const fontSize = getResponsiveFontSize(this, 32);
        const txt = this.add.text(0, 0, label, {
            fontFamily: 'Arial',
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

    createSpriteButton = (textureKey, onClick) => {
        const baseScale = 3;
        const hoverScale = 4;

        const scale = getResponsiveScale(this,1);
        const standartScale = baseScale * scale;
        const pointOnScale = hoverScale * scale;

        const img = this.add.image(0, 0, textureKey)
            .setInteractive({ useHandCursor: true })
            .setScale(standartScale);

        img.on('pointerover', () => img.setScale(pointOnScale));
        img.on('pointerout',  () => img.setScale(standartScale));
        img.on('pointerup',   onClick);

        return img;
    }

    updateLayout = (gameSize) => {
        const { width, height } = this.scale;
        const titleOffset = 0.2;

        if (this.bg) {
            this.bg.setDisplaySize(width, height);
        }

        if (this.titleText) {
            const titleFontSize = getResponsiveFontSize(this, 80);
            this.titleText.setFontSize(titleFontSize);
            this.titleText.setPosition(width / 2, height * titleOffset);
        }

        if (this.menuButtons && this.menuButtons.length > 0) {
            const totalButtons = this.menuButtons.length;
            const stepY = getResponsiveFontSize(this, 100); // Относительное расстояние
            const totalHeight = (totalButtons - 1) * stepY;
            let startY = height / 2 - totalHeight / 2;

            // Обновляем масштаб и позицию каждой кнопки
            this.menuButtons.forEach((btn, index) => {
                const baseScale = 3;
                const scale = getResponsiveScale(this, 1);
                btn.setScale(baseScale * scale);
                btn.x = width / 2;
                btn.y = startY + index * stepY;
            });
        }
    }

    languageChange = () => {
        const { width } = this.scale;
        const paddingX = getResponsiveFontSize(this, 20);
        const paddingY = getResponsiveFontSize(this, 20);
        const fontSize = getResponsiveFontSize(this, 18);

        var languageToChange = localStorage.getItem('lang') === 'ru' ? 'EN' : 'RU';

        this.langButton = this.add.text(0, 0, languageToChange, {
            fontFamily: 'Arial',
            fontSize: fontSize + 'px',
            color: '#ffffff'
        }).setOrigin(1, 0)
            .setPosition(width - paddingX, paddingY);

        this.langButton.setInteractive({ useHandCursor: true });

        this.langButton.on('pointerover', () => {
            this.langButton.setStyle({color: '#ffff00'});
        })

        this.langButton.on('pointerout', () => {
            this.langButton.setStyle({color: '#ffffff'});
        })

        this.langButton.on('pointerup', () => {
            localStorage.setItem("lang", languageToChange.toLowerCase());
            location.reload();
        });
    }
}