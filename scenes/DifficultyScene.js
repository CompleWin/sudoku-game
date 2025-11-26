import createBackgroundImage from "../tools/createBackgroundImage.js";
import getResponsiveFontSize from "../tools/getResponsiveFontSize.js";
import createDifficultyButton from "../tools/createDifficultyButton.js";
import updateLayout from "../tools/updateLayout.js";
import autoLayoutEvent from "../tools/autoLayoutEvent.js";


export default class DifficultyScene extends Phaser.Scene {
    
    constructor() {
        super('DifficultyScene');
        this._onResize = null;
    }
    
    create() {
        const {width, height} = this.scale;
        
        createBackgroundImage(this);
        
        // Заглушка НАДО БУДЕТ ИСПРАВИТЬ
        this.difficultyTitleText = this.add.text(0, 0, "Выберите сложность", {
            fontFamily: 'Arial',
            fontSize: getResponsiveFontSize(this, 48) + 'px',
            color: '#ffffff'
        }).setOrigin(0.5, 0);
        
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
            fontSize: getResponsiveFontSize(this, 20) + 'px',
            color: '#ffffff',
            fontFamily: 'Arial'
        })
            .setOrigin(0)
            .setInteractive({ useHandCursor: true });

        this.backButton.on('pointerover', () => this.backButton.setColor('#3498db'));
        this.backButton.on('pointerout', () => this.backButton.setColor('#ffffff'));
        this.backButton.on('pointerup', () => this.scene.start('MenuScene'));

        autoLayoutEvent(this, updateLayout);
    }
}