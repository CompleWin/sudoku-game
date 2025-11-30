import configAuth from "../../tools/config/configAuth.js";
import {getLanguage, Language} from "../../language.js";
import configFont from "../../tools/config/configFont.js";

const createConfirmButton = (scene, panelHeight, panelWidth, inputElement) => {

    const { width, height } = scene.scale;

    scene.confirmButton = scene.add.image(
        width / 2,
        height / 2,
        'uiButtons',
        `continue_${getLanguage()}.png`
    ).setScale(configAuth.confirmButtonBaseScale)
        .setInteractive({useHandCursor: true});

    scene.confirmButton.on('pointerover', () => {
        scene.confirmButton.setTexture('uiButtonsHover', `continue_hover_${getLanguage()}.png`);
    })

    scene.confirmButton.on('pointerout', () => {
        scene.confirmButton.setTexture('uiButtons', `continue_${getLanguage()}.png`);
    });

    scene.confirmButton.on('pointerup', () => {
        scene.submitNickname(scene.inputElement);
    });

    scene.errorText = scene.add.text(
        width / 2,
        height / 2,
        '',
        {
            fontFamily: configFont.defaultFontFamily,
            fontSize: configFont.errorFontSize,
            color: configFont.errorFontColor,
            align: configFont.errorFontAlign,
            wordWrap: {width: panelWidth * 0.9}
        }
    ).setOrigin(0.5, 0);
}

export default createConfirmButton;