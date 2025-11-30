import showLoseMessage from "./showLoseMessage.js";

const checkErrors = (scene) => {
    scene.isGameOver = true;

    if (scene.isMultiplayer && scene.socket && scene.roomId) {
        if (!scene.hasSentMistakeLose) {
            scene.hasSentMistakeLose = true;

            scene.socket.emit('playerMistakeLose', {
                roomId: scene.roomId,
            });
        }
    } else {
        showLoseMessage(scene);
    }

}

export default checkErrors;