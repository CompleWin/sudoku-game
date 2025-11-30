import createSpriteButton from "./createSpriteButton.js";
import {getLanguage} from "../../language.js";
import getConfigMenuItems from "../config/getConfigMenuItems.js";

const createMenuButtons = (scene) => {

    scene.menuButtons = [];

    const menuItems = getConfigMenuItems(scene);

    menuItems.forEach((item) => {
        const container = createSpriteButton(scene, item.atlasKey, item.key, item.hoverAtlasKey, item.hoverKey, item.onClick);
        scene.menuButtons.push(container);
    });

}

export default createMenuButtons;