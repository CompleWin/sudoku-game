import createCenterText from "../create/createCenterText.js";
import {Language} from "../../language.js";
import stopTimer from "../timer/stopTimer.js";
import createTimerText from "../timer/createTimerText.js";
import formatTime from "../timer/formatTime.js";
import configSudokuLayout from "../config/configSudokuLayout.js";

const showLoseMessage = (scene) => {
    stopTimer(scene);

    createCenterText(scene, Language.data["game"]["lose"], '#e74c3c', 48, 'bold');
    createTimerText(
        scene,
        Language.data["game"]["time"] + formatTime(scene.elapsedTime),
        scene.scale.height / 2 + configSudokuLayout.timerCenterOffset
    );
    scene.backButton.removeListener('pointerup');
    scene.backButton.on('pointerup', () => scene.scene.start('MenuScene'));

}

export default showLoseMessage;