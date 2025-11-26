import createBackgroundImage from "../tools/createBackgroundImage.js";
import getResponsiveFontSize from "../tools/getResponsiveFontSize.js";
import createDifficultyButton from "../tools/createDifficultyButton";

export default class DifficultyScene extends Phaser.Scene {
    
    constructor() {
        super('DifficultyScene');
    }
    
    create() {
        const {width, height} = this.scale;
        
        createBackgroundImage(this);
        
        // Заглушка НАДО БУДЕТ ИСПРАВИТЬ
        this.titleText = this.add.text(width / 2, height * 0.2, "Выберите сложность", {
            fontFamily: 'Arial',
            fontSize: getResponsiveFontSize(48) + 'px',
            color: '#ffffff'
        });
        
        this.difficultyButtons = [];
        
        const difficulties = [
            {key: 'easy', label: 'Легкий', color: '#59c27d', hoverColor: '#afbfff'},
            {key: 'medium', label: 'Средний', color: '#ffb347', hoverColor: '#afbfff'},
            {key: 'hard', label: 'Сложный', color: '#ff5a5a', hoverColor: '#afbfff'},
        ];
        
        difficulties.forEach(item => {
            const btn = createDifficultyButton(this,  item.label, item.color, item.hoverColor, () => {
                this.scene.start('GameScene', {DifficultyScene: item.key});
            });
            this.difficultyButtons.push(btn);
        })

        // Кнопка назад
        this.backButton = this.add.text(20, 20, '← Назад', {
            fontSize: getResponsiveFontSize(20) + 'px',
            color: '#ffffff',
            fontFamily: 'Arial'
        })
            .setOrigin(0)
            .setInteractive({ useHandCursor: true });

        this.backButton.on('pointerover', () => this.backButton.setColor('#3498db'));
        this.backButton.on('pointerout', () => this.backButton.setColor('#ffffff'));
        this.backButton.on('pointerup', () => this.scene.start('MenuScene'));

        this.updateLayout();
        this.scale.on('resize', this.updateLayout, this);
        
        
    }
}