import showWinMessage from "../../sudoku/showWinMessage.js";
import showLoseMessage from "../../sudoku/showLoseMessage.js";
import createCenterText from "../../create/createCenterText.js";
import {Language} from "../../../language.js";

const gameResult = (scene) => {
    scene.socket.on('gameResult', ({result}) => {
        if (result === 'win') {
            showWinMessage(scene);
        } else if (result === 'lose') {
            showLoseMessage(scene);
        } else {
            createCenterText(scene, Language.data["game"]["game_over"], '#ffffff', 48, 'bold');
        }
    });
}

export default gameResult;