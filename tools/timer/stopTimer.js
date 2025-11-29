
const stopTimer = (scene) => {
    if (scene.timerEvent) {
        scene.timerEvent.remove(false);
        scene.timerEvent = null;
    }
}

export default stopTimer;