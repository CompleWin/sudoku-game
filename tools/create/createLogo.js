import configSpriteScale from "../config/configSpriteScale.js";
import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";
import {getLanguage} from "../../language.js";

const createLogo = (scene) => {
    const {width, height} = scene.scale;

    const currentLanguage = getLanguage();

    scene.titleSprite = scene.add.image(
        width / 2,
        height * configSpriteScale.titleOffset,
        'logo',
        `logo_${currentLanguage}.png`
    ).setOrigin(0.5);

    const scale = getResponsiveFontSize(scene, 1);
    scene.titleSprite.setScale(configSpriteScale.baseLogoScale * scale);
}

export default createLogo;