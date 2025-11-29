import formatTime from "./formatTime.js";
import createTimerText from "./createTimerText.js";

const startTimer = (scene) => {
    if (scene.timerEvent) {
        scene.timerEvent.remove(false);
        scene.timerEvent = null;
    }

    scene.elapsedTime = 0;

    if (!scene.timerText || !scene.timerText.active) {

        createTimerText(scene);

    } else {

        scene.timerText.setText("00:00");
    }

    scene.timerEvent = scene.time.addEvent({
        delay: 1000,
        loop: true,
        callback: () => {

            if (!scene.scene.isActive() || !scene.timerText || !scene.timerText.active) {
                return;
            }

            scene.elapsedTime += 1;
            scene.timerText.setText(formatTime(scene.elapsedTime));

        }
    });
}

export default startTimer;