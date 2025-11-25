class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }
    
    preload() {
        const lang = localStorage.getItem('lang') || 'ru';
        
        
        
        this.load.json("lang", `assets/languages/${lang}.json`);
        
        this.load.image('bg_menu', '../assets/1.png');
    }
    
    create() {
        Language.data = this.cache.json.get("lang");
        this.scene.start('MenuScene');
    }
}