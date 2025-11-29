import createCenterText from "../create/createCenterText.js";
import {Language} from "../../language.js";

const showWinMessage = (scene) => {

    createCenterText(scene, Language.data["game"]["victory"], '#2ecc71', 48, 'bold');
    scene.backButton.removeListener('pointerup');
    scene.backButton.on('pointerup', () => scene.scene.start('MenuScene'));
}

export default showWinMessage;