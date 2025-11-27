import createBackgroundImage from "../tools/create/createBackgroundImage.js";
import getResponsiveFontSize from "../tools/responvisve/getResponsiveFontSize.js";
import createDifficultyButton from "../tools/create/createDifficultyButton.js";
import updateLayout from "../tools/layout/updateLayout.js";
import autoLayoutEvent from "../tools/layout/autoLayoutEvent.js";
import configSudoku from "../tools/config/configSudoku.js";
import createBackButton from "../tools/create/createBackButton.js";


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
            {key: configSudoku.difficulties[0], label: 'Легкий', color: '#59c27d', hoverColor: '#afbfff'},
            {key: configSudoku.difficulties[1], label: 'Средний', color: '#ffb347', hoverColor: '#afbfff'},
            {key: configSudoku.difficulties[2], label: 'Сложный', color: '#ff5a5a', hoverColor: '#afbfff'},
        ];
        
        difficulties.forEach(item => {
            const btn = createDifficultyButton(this,  item.label, item.color, item.hoverColor, () => {
                this.scene.start('GameScene', {DifficultyScene: item.key});
            });
            this.difficultyButtons.push(btn);
        })

        createBackButton(this);

        autoLayoutEvent(this, updateLayout);
    }
}