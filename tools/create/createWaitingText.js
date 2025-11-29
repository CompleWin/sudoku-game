import configFont from "../config/configFont.js";
import {Language} from "../../language.js";

const createWaitingText = (scene) => {

    const {width, height} = scene.scale;

    scene.waitingText = scene.add.text(
        width / 2,
        height / 2,
        Language.data["menu"]["waiting_text"],
        {
            fontSize: configFont.buttonsFontSize,
            color: '#ffffff',
            fontFamily: configFont.buttonsFontFamily
        }
    ).setOrigin(0.5);
}

export default createWaitingText;