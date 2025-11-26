
export default class DifficultyScene extends Phaser.Scene {
    
    constructor() {
        super('DifficultyScene');
    }
    
    create() {
        const {width, height} = this.scale;

        this.bg = this.add.image(0, 0, 'bg_menu')
            .setOrigin(0)
            .setDisplaySize(width, height);
        
    }
}