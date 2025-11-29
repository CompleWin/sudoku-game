import createBackgroundImage from "../tools/create/createBackgroundImage.js";
import getResponsiveFontSize from "../tools/responvisve/getResponsiveFontSize.js";
import createButton from "../tools/create/createButton.js";
import updateLayout from "../tools/layout/updateLayout.js";
import autoLayoutEvent from "../tools/layout/autoLayoutEvent.js";
import configSudoku from "../tools/config/configSudoku.js";
import createBackButton from "../tools/create/createBackButton.js";
import configFont from "../tools/config/configFont.js";
import configDifficultyButton from "../tools/config/configDifficultyButton.js";
import {Language} from "../language.js";
import createDifficultyButtons from "../tools/create/createDifficultyButtons.js";


export default class DifficultyScene extends Phaser.Scene {

    constructor() {
        super('DifficultyScene');
        this._onResize = null;
        this.isMultiplayer = false;
    }

    init(data) {
        this.isMultiplayer = data.isMultiplayer;
    }

    create() {
        createBackgroundImage(this);

        this.difficultyTitleText = this.add.text(0, 0, Language.data['difficulty']["title"], {
            fontFamily: configFont.buttonsFontFamily,
            fontSize: getResponsiveFontSize(this, 48) + 'px',
            color: '#ffffff'
        }).setOrigin(0.5, 0);

        createDifficultyButtons(this);

        createBackButton(this);

        autoLayoutEvent(this, updateLayout);
    }
}