class MenuScene extends Phaser.Scene {
    
    constructor() {
        super('MenuScene');
    }
    
    create() {
        
        const width = this.scale.width;
        const height = this.scale.height;
        
        const bg = this.add.image(width / 2, height / 2, 'bg_menu');
        bg.setDisplaySize(width, height);
        this.languageChange(width, height);

        this.add.text(width / 2, height / 4, Language.t("menu.title"), {
            fontFamily: 'Arial',
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        const menuItems = [
            {key: "menu.single_player", scene: "SinglePlayerScene"},
            {key: "menu.multiplayer", scene: ""},
            {key: "menu.settings", scene: ""},
            {key: "menu.stats", scene: ""},
        ];
        
        const startY = height / 2 - 60;
        const stepY = 40;
        
        menuItems.forEach((item, index) => {
            const option = this.add.text(width / 2, startY + index * stepY, Language.t(item.key), {
                fontFamily: 'Arial',
                fontSize: '28px',
                color: '#ffffff'
            }).setOrigin(0.5);
            
            option.setInteractive({useHandCursor: true});
            
            option.on('pointerover', () => {
                option.setStyle({color: '#ffff00'});
            })
            
            option.on('pointerout', () => {
                option.setStyle({color: '#ffffff'});
            })
            
            option.on('pointerup', () => {
                this.scene.start(item.scene);
            });

        });
    }

    languageChange = (width, height) => {
        var languageToChange = localStorage.getItem('lang') === 'ru' ? 'EN' : 'RU';
        console.log(localStorage.getItem('lang'))
        const langButton = this.add.text(700, 500, languageToChange, {
            ontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff'
        }).setOrigin(0.5);

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
