import {getLanguage} from "../../../language.js";

const opponentProgress = (scene) => {
    scene.socket.on('opponentProgress', ({emptyCells, nickname}) => {
        if (scene.opponentProgressText) {
            const name = nickname || scene.opponentNickname;

            let text = null;

            if (getLanguage() === 'ru') {
                text = `У ${name} осталось\n${emptyCells} свободных клеток`;
            }
            else {
                text = `${name} has ${emptyCells}\nfree cells left`;
            }

            scene.opponentProgressText.setText(
                text
            );
        }
    });
}

export default opponentProgress;