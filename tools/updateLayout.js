import configSpriteScale from "./config/configSpriteScale.js";
import getResponsiveFontSize from "./responvisve/getResponsiveFontSize.js";
import getResponsiveScale from "./responvisve/getResponsiveScale.js";

const updateLayout = (scene) => {
    const { width, height } = scene.scale;
    const titleOffset = configSpriteScale.titleOffset;

    if (scene.bg) {
        scene.bg.setDisplaySize(width, height);
    }
    
    if (scene.titleSprite) {
        const baseLogoScale = configSpriteScale.baseLogoScale; 
        const scale = getResponsiveScale(scene, 1);

        scene.titleSprite.setScale(baseLogoScale * scale);
        scene.titleSprite.setPosition(width / 2, height * titleOffset);
    }

    if (scene.langButton) {
        const baseScale = configSpriteScale.langButtonScale;
        const scale = getResponsiveScale(scene, 1);
        const paddingBase = configSpriteScale.langButtonPadding;

       
        const paddingX = getResponsiveFontSize(scene, paddingBase);
        const paddingY = getResponsiveFontSize(scene, paddingBase);

        scene.langButton.setScale(baseScale * scale);

        
        scene.langButton.setOrigin(1, 0);
        scene.langButton.setPosition(width - paddingX, paddingY);
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
        const fontSize = getResponsiveFontSize(scene, 20);
        scene.backButton.setFontSize(fontSize);
    }

    // Обновляем кнопки сложности
    if (scene.difficultyButtons && scene.difficultyButtons.length > 0) {
        const scale = getResponsiveScale(scene,1);
        const stepY = 60 * scale;
        const startY = height / 2 - stepY;

        scene.difficultyButtons.forEach((btn, index) => {
            btn.setScale(scale);
            btn.setPosition(width / 2, startY + index * stepY);
        });
    }

    if (scene.difficultyTitleText) {
        const fontSize = getResponsiveFontSize(scene, 48);
        scene.difficultyTitleText.setFontSize(fontSize);
        scene.difficultyTitleText.setPosition(width / 2, height * titleOffset);
    }
}

export default updateLayout;