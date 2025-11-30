import {getLanguage} from "../../language.js";

const getConfigMenuItems = (scene) => {

    const currentLanguage = getLanguage();

    return [
        {
            atlasKey: "uiButtons",
            key: `play_${currentLanguage}.png`,
            scene: "DifficultyScene",
            hoverAtlasKey: 'uiButtonsHover',
            hoverKey: `play_${currentLanguage}_hover.png`,
            onClick: () => {
                scene.scene.start('DifficultyScene', {
                    isMultiplayer: false,
                });
            }
        },
        {
            atlasKey: "uiButtons",
            key: `multiplayer_${currentLanguage}.png`,
            scene: "DifficultyScene",
            hoverAtlasKey: 'uiButtonsHover',
            hoverKey: `multiplayer_${currentLanguage}_hover.png`,
            onClick: () => {
                scene.scene.start('DifficultyScene', {
                    isMultiplayer: true,
                });
            }
        },
        {
            atlasKey: "uiButtons",
            key: `settings_${currentLanguage}.png`,
            scene: "",
            hoverAtlasKey: 'uiButtonsHover',
            hoverKey: `settings_${currentLanguage}_hover.png`,
            onClick: () => {
                scene.scene.start('');
            }
        },
        {
            atlasKey: "uiButtons",
            key: `stats_${currentLanguage}.png`,
            scene: "",
            hoverAtlasKey: 'uiButtonsHover',
            hoverKey: `stats_${currentLanguage}_hover.png`,
            onClick: () => {
                scene.scene.start('')
            }
        },
    ];

}

export default getConfigMenuItems;