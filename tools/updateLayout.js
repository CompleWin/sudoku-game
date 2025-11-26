import configSpriteScale from "./configSpriteScale.js";
import getResponsiveFontSize from "./getResponsiveFontSize.js";
import getResponsiveScale from "./getResponsiveScale.js";

const updateLayout = (scene) => {
    const { width, height } = scene.scale;
    const titleOffset = configSpriteScale.titleOffset;

    if (scene.bg) {
        scene.bg.setDisplaySize(width, height);
    }

    if (scene.titleText) {
        const titleFontSize = getResponsiveFontSize(scene, configSpriteScale.textBaseSize);
        scene.titleText.setFontSize(titleFontSize);
        scene.titleText.setPosition(width / 2, height * titleOffset);
    }

    if (scene.menuButtons && scene.menuButtons.length > 0) {
        const totalButtons = scene.menuButtons.length;
        const stepY = getResponsiveFontSize(scene, configSpriteScale.baseStepY); // Относительное расстояние
        const totalHeight = (totalButtons - 1) * stepY;
        let startY = height / 2 - totalHeight / 2;

        // Обновляем масштаб и позицию каждой кнопки
        scene.menuButtons.forEach((btn, index) => {
            const baseScale = configSpriteScale.baseScale;
            const scale = getResponsiveScale(scene, 1);
            btn.setScale(baseScale * scale);
            btn.x = width / 2;
            btn.y = startY + index * stepY;
        });
    }

    if (scene.backButton) {
        const fontSize = getResponsiveFontSize(20);
        scene.backButton.setFontSize(fontSize);
    }

    // Обновляем кнопки сложности
    if (scene.difficultyButtons && scene.difficultyButtons.length > 0) {
        const scale = getResponsiveScale(1);
        const stepY = 120 * scale;
        const startY = height / 2 - stepY;

        scene.difficultyButtons.forEach((btn, index) => {
            btn.setScale(scale);
            btn.setPosition(width / 2, startY + index * stepY);
        });
    }
}

export default updateLayout;