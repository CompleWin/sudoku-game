import {Language} from "../../language.js";
import configFont from "../../tools/config/configFont.js";

const createWelcomeText = (scene, panelWidth, panelHeight) => {

    const {width, height} = scene.scale;

    const textStyle = {
        fontFamily: configFont.defaultFontFamily,
        fontSize: configFont.welcomeFontSize,
        color: configFont.welcomeFontColor,
        align: configFont.welocmeFontAlign,
        wordWrap: {width: panelWidth * 0.9},
        lineSpacing: configFont.welocomeFontSpacing,
    };

    scene.welcomeText = scene.add.text(
        width / 2,
        height / 2 - configFont.welcomeFontYOffset,
        Language.data["welcome"]["welcome_text"],
        textStyle
    ).setOrigin(0.5);

}

export default createWelcomeText;