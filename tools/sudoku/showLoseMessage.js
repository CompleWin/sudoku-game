import createCenterText from "../create/createCenterText.js";
import {Language} from "../../language.js";

const showLoseMessage = (scene) => {
    createCenterText(scene, Language.data["game"]["lose"], '#e74c3c', 48, 'bold');
}

export default showLoseMessage;