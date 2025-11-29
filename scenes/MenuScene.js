import createBackgroundImage from "../tools/create/createBackgroundImage.js";
import updateLayout from "../tools/layout/updateLayout.js";
import autoLayoutEvent from "../tools/layout/autoLayoutEvent.js";
import createMenuButtons from "../tools/create/createMenuButtons.js";
import createLanguageChangeButton from "../tools/create/createLanguageChangeButton.js";
import createLogo from "../tools/create/createLogo.js";

export default class MenuScene extends Phaser.Scene {

    constructor() {
        super('MenuScene');
    }

    create() {
        createBackgroundImage(this);
        createLanguageChangeButton(this);
        createLogo(this);
        createMenuButtons(this);
        autoLayoutEvent(this, updateLayout);
    }
}