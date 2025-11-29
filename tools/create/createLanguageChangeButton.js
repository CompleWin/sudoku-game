import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";
import {getLanguage, setLanguage} from "../../language.js";

const createLanguageChangeButton = (scene) => {
    const { width } = scene.scale;
    const paddingX = getResponsiveFontSize(scene, 20);
    const paddingY = getResponsiveFontSize(scene, 20);

    const languageToChange = getLanguage() === 'ru' ? 'en' : 'ru';

    scene.langButton = scene.add.image(0, 0, 'langUI', `${languageToChange.toLowerCase()}.png`)
        .setOrigin(1, 0)
        .setPosition(width - paddingX, paddingY);

    scene.langButton.setInteractive({ useHandCursor: true });

    scene.langButton.on('pointerup', () => {
        setLanguage(languageToChange);
    });
}

export default createLanguageChangeButton;