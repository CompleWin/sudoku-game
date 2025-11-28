import configFont from "../config/configFont.js";

const createWaitingText = (scene, text = 'Поиск соперника...') => {

    const {width, height} = scene.scale;

    scene.waitingText = scene.add.text(
        width / 2,
        height / 2,
        text,
        {
            fontSize: configFont.buttonsFontSize,
            color: '#ffffff',
            fontFamily: configFont.buttonsFontFamily
        }
    ).setOrigin(0.5);
}

export default createWaitingText;