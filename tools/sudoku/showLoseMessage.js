import createCenterText from "../create/createCenterText.js";
import {Language} from "../../language.js";
import stopTimer from "../timer/stopTimer.js";

const showLoseMessage = (scene) => {
    createCenterText(scene, Language.data["game"]["lose"], '#e74c3c', 48, 'bold');
    stopTimer(scene);
}

export default showLoseMessage;