import configFont from "../config/configFont.js";
import {Language} from "../../language.js";

const createWaitingText = (scene) => {

    const {width, height} = scene.scale;

    const baseText = Language.data["menu"]["waiting_text"];;

    if (scene.waitingText) {
        scene.waitingText.destroy();
        scene.waitingText = null;
    }

    scene.waitingText = scene.add.text(
        width / 2,
        height / 2,
        baseText,
        {
            fontSize: configFont.buttonsFontSize,
            color: configFont.buttonsFontColor,
            fontFamily: configFont.buttonsFontFamily
        }
    ).setOrigin(0.5);

    if (scene.waitingDotsEvent) {
        scene.waitingDotsEvent.remove(false);
        scene.waitingDotsEvent = null;
    }

    let dots = 0;

    scene.waitingDotsEvent = scene.time.addEvent({
        delay: 500,
        loop: true,
        callback: () => {
            if (!scene.waitingText) {
                if (scene.waitingDotsEvent) {
                    scene.waitingDotsEvent.remove(false);
                    scene.waitingText = null;
                }
                return;
            }

            dots = (dots + 1) % 4;
            scene.waitingText.setText(baseText + '.'.repeat(dots));
        }
    });
}

export default createWaitingText;