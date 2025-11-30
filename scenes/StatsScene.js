import createCenterText from "../tools/create/createCenterText.js";
import createBackgroundImage from "../tools/create/createBackgroundImage.js";

export default class StatsScene extends Phaser.Scene {

    constructor() {
        super('StatsScene');
    }

    create() {

        createCenterText(
            this,
            'coming soon...',
            '#ffffff',
            24,
            'bold'
        );
    }
}