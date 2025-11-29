import showWinMessage from "../sudoku/showWinMessage.js";
import createCenterText from "../create/createCenterText.js";
import showLoseMessage from "../sudoku/showLoseMessage.js";
import {Language} from "../../language.js";
import waitingForOpponent from "./Server-Callbacks/waitingForOpponent.js";
import gameStarted from "./Server-Callbacks/gameStarted.js";
import opponentProgress from "./Server-Callbacks/opponentProgress.js";
import gameResult from "./Server-Callbacks/gameResult.js";
import disconnect from "./Server-Callbacks/disconnect.js";

const registerMultiplayerSocketHandlers = (scene) => {

    if (!scene.socket) {
        return;
    }
    waitingForOpponent(scene);
    gameStarted(scene);
    opponentProgress(scene);
    gameResult(scene);
    disconnect(scene);
}

export default registerMultiplayerSocketHandlers;