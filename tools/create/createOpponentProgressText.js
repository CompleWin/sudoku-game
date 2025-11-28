import configFont from "../config/configFont.js";

const createOpponentProgressText = (scene, text='У другого игрока осталось 81 свободных клеток') => {

    const { width } = scene.scale;

    scene.opponentProgressText = scene.add.text(
        width - 20,
        20,
        text,
        {
            fontSize: configFont.opponentProgressFontSize,
            color: configFont.opponentProgressFontColor,
            fontFamily: configFont.defaultFontFamily
        }
    ).setOrigin(1, 0);

}

export default  createOpponentProgressText;