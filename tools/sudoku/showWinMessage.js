import createCenterText from "../create/createCenterText.js";
import {Language} from "../../language.js";
import stopTimer from "../timer/stopTimer.js";

const showWinMessage = (scene) => {

    createCenterText(scene, Language.data["game"]["victory"], '#2ecc71', 48, 'bold');

    stopTimer(scene);

    scene.backButton.removeListener('pointerup');
    scene.backButton.on('pointerup', () => scene.scene.start('MenuScene'));
}

export default showWinMessage;