import showWinMessage from "../../sudoku/showWinMessage.js";
import showLoseMessage from "../../sudoku/showLoseMessage.js";
import createCenterText from "../../create/createCenterText.js";
import {Language} from "../../../language.js";
import stopTimer from "../../timer/stopTimer.js";
import createTimerText from "../../timer/createTimerText.js";
import formatTime from "../../timer/formatTime.js";
import configSudokuLayout from "../../config/configSudokuLayout.js";

const gameResult = (scene) => {
    scene.socket.on('gameResult', ({result}) => {
        if (result === 'win') {
            showWinMessage(scene);
        } else if (result === 'lose') {
            showLoseMessage(scene);
        } else {
            stopTimer(scene);
            createCenterText(scene, Language.data["game"]["game_over"], '#ffffff', 48, 'bold');
            createTimerText(
                scene,
                Language.data["game"]["time"] + formatTime(scene.elapsedTime),
                scene.scale.height / 2 + configSudokuLayout.timerCenterOffset
            );
        }
    });
}

export default gameResult;