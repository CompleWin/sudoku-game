class MenuScene extends Phaser.Scene {
    
    constructor() {
        super('MenuScene');
    }
    
    create() {
        this.bg = this.add.image(0, 0, 'bg_menu').setOrigin(0);
        
        this.languageChange();

        this.titleText = this.add.text(0, 0, Language.t("menu.title"), {
            fontFamily: 'Arial',
            fontSize: '5rem',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        this.menuButtons = [];
        
        const menuItems = [
            {key: "menu.single_player", scene: "SinglePlayerScene"},
            {key: "menu.multiplayer", scene: ""},
            {key: "menu.settings", scene: ""},
            {key: "menu.stats", scene: ""},
        ];
        
        menuItems.forEach((item) => {
            const container = this.createButton(Language.t(item.key), () => {
               this.scene.start(item.scene); 
            });
            this.menuButtons.push(container);
        });
        
        this.updateLayout(this.scale.gameSize);
        
        this.scale.on('resize', this.updateLayout, this);
    }

    createButton = (label, onClick) => {
        const container = this.add.container(0, 0);
        
        
        const txt = this.add.text(0, 0, label, {
            fontFamily: 'Arial',
            fontSize: '2rem',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        container.add(txt);
        container.setSize(260, 50);
        container.setInteractive({ useHandCursor: true });

        container.on('pointerover', () => bg.setFillStyle(0x6666ff));
        container.on('pointerout',  () => bg.setFillStyle(0x4444aa));
        container.on('pointerup', onClick);
        
        return container;
    }

    updateLayout = (gameSize) => {
        const width  = gameSize.width;
        const height = gameSize.height;
        const titleOffset = 0.2;
        
        
        // фон на весь экран
        if (this.bg) {
            this.bg.setDisplaySize(width, height);
        }

        // заголовок: сверху по центру
        if (this.titleText) {
            this.titleText.setPosition(width / 2, height * titleOffset);
        }

        // кнопки: столбиком по центру
        if (this.menuButtons && this.menuButtons.length > 0) {
            const totalButtons = this.menuButtons.length;
            const stepY = 60;
            const totalHeight = (totalButtons - 1) * stepY;
            let startY = height / 2 - totalHeight / 2;

            this.menuButtons.forEach((btn, index) => {
                btn.x = width / 2;
                btn.y = startY + index * stepY;
            });
        }
    }
    
    languageChange = () => {
        var languageToChange = localStorage.getItem('lang') === 'ru' ? 'EN' : 'RU';
        console.log(localStorage.getItem('lang'))
        const langButton = this.add.text(0, 0, languageToChange, {
            ontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff'
        }).setOrigin(1, 0).setPosition(this.scale.gameSize.width - 20, 20);

        langButton.setInteractive();
        langButton.on('pointerover', () => {
            langButton.setStyle({color: '#ffff00'});
        })

        langButton.on('pointerout', () => {
            langButton.setStyle({color: '#ffffff'});
        })

        langButton.on('pointerup', () => {
            localStorage.setItem("lang", languageToChange.toLowerCase());
            location.reload();
        });
    }
}
