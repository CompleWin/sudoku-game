import configSudoku from "../config/configSudoku.js";
import createButton from "./createButton.js";
import configDifficultyButton from "../config/configDifficultyButton.js";
import getConfigDifficultyItems from "../config/getConfigDifficultyItems.js";

const createDifficultyButtons = (scene) => {
    scene.difficultyButtons = [];

    const difficulties = getConfigDifficultyItems(scene);

    difficulties.forEach(item => {
        const btn = createButton(
            scene,
            item.label,
            32,
            configDifficultyButton.width,
            configDifficultyButton.height,
            item.color,
            item.hoverColor,
            () => {
                scene.scene.start('GameScene', {
                    difficulty: item.key,
                    isMultiplayer: scene.isMultiplayer
                });
            });
        scene.difficultyButtons.push(btn);
    })
}

export default createDifficultyButtons;