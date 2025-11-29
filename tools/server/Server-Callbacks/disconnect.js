import createCenterText from "../../create/createCenterText.js";
import {Language} from "../../../language.js";

const disconnect = (scene) => {
    scene.socket.on('disconnect', (reason) => {
        console.log(`Socket disconnected: ${reason}`);

        const isManual =
            reason === 'io client disconnect' ||
            reason === 'server namespace disconnect';

        if (!scene.hasSentSolved && !isManual) {
            createCenterText(scene, Language.data["game"]["lost_connection"], '#e67e22', 48, 'bold');
        }
    })
}

export default disconnect;