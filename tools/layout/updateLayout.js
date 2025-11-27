import configSpriteScale from "../config/configSpriteScale.js";
import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";
import getResponsiveScale from "../responvisve/getResponsiveScale.js";
import configSudoku from "../config/configSudoku.js";

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

    if (scene.gridContainer && scene.gridBackground) {
        const scale = getResponsiveScale(scene, 1);

        const baseGridWidth = scene.gridBackground.width;
        const baseGridHeight = scene.gridBackground.height;

        const gridWidth = baseGridWidth * scale;
        const gridHeight = baseGridHeight * scale;

        scene.gridContainer.setScale(scale);
        scene.gridContainer.setPosition(
            width / 2 - gridWidth / 2,
            height / 2 - gridHeight / 2
        );
    }



    if (scene.numberButtons) {
        const buttonSpacing = 60 * getResponsiveScale(scene, 1);
        const startX = width / 2 - (buttonSpacing * 4);
        const y = height - 120;

        scene.numberButtons.forEach((btn, i) => {
            btn.setPosition(startX + i * buttonSpacing, y);
        });
    }

    // Обновляем кнопку очистки
    if (scene.clearButton) {
        scene.clearButton.setPosition(width / 2, height - 40);
    }

    if (scene.backButton) {
        const fontSize = getResponsiveFontSize(scene, 20);
        scene.backButton.setFontSize(fontSize);
    }


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