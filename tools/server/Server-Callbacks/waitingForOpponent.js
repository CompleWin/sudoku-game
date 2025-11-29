import createWaitingText from "../../create/createWaitingText.js";
import createBackButton from "../../create/createBackButton.js";

const waitingForOpponent = (scene) => {
    scene.socket.on('waitingForOpponent', () => {
        createWaitingText(scene);
        createBackButton(scene);
    });
}

export default waitingForOpponent;