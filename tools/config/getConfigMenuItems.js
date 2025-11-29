import {getLanguage} from "../../language.js";

const getConfigMenuItems = (scene) => {

    const currentLanguage = getLanguage();

    return [
        {
            atlasKey: "uiButtons",
            key: `play_${currentLanguage}.png`,
            scene: "DifficultyScene",
            onClick: () => {
                scene.scene.start('DifficultyScene', {
                    isMultiplayer: false,
                });
            }
        },
        {
            atlasKey: "uiButtons",
            key: `play_${currentLanguage}.png`,
            scene: "DifficultyScene",
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
            onClick: () => {
                scene.scene.start('');
            }
        },
        {
            atlasKey: "uiButtons",
            key: `stats_${currentLanguage}.png`,
            scene: "",
            onClick: () => {
                scene.scene.start('')
            }
        },
    ];

}

export default getConfigMenuItems;