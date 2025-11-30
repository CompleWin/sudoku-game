import configSpriteScale from "../config/configSpriteScale.js";
import getResponsiveFontSize from "../responvisve/getResponsiveFontSize.js";
import getResponsiveScale from "../responvisve/getResponsiveScale.js";
import sudokuGridLayout from "./layouts/sudokuGridLayout.js";
import numberButtonsLayout from "./layouts/numberButtonsLayout.js";
import configDifficultyButton from "../config/configDifficultyButton.js";
import timerLayout from "./layouts/timerLayout.js";
import welcomeTextLayout from "./layouts/welcomeTextLayout.js";
import inputLayout from "./layouts/inputLayout.js";
import confirmButtonLayout from "./layouts/confirmButtonLayout.js";
import errorTextLayout from "./layouts/errorTextLayout.js";
import configFont from "../config/configFont.js";
import configSudokuLayout from "../config/configSudokuLayout.js";

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

    if (scene.welcomeText) {
        welcomeTextLayout(scene);
    }

    if (scene.inputDom && scene.inputElement) {
        inputLayout(scene);
    }

    if (scene.confirmButton) {
        confirmButtonLayout(scene);
    }

    if (scene.errorText) {
        errorTextLayout(scene);
    }

    if (scene.menuButtons && scene.menuButtons.length > 0) {
        const totalButtons = scene.menuButtons.length;
        const stepY = getResponsiveFontSize(scene, configSpriteScale.baseStepY);
        const totalHeight = (totalButtons - 1) * stepY;
        let startY = height / 2 - totalHeight / 2 + 30;

        scene.menuButtons.forEach((btn, index) => {
            const baseScale = configSpriteScale.baseScale;
            const scale = getResponsiveScale(scene, 1);
            btn.setScale(baseScale * scale);
            btn.x = width / 2;
            btn.y = startY + index * stepY;
        });
    }

    if (scene.gridContainer && scene.gridBackground) {
        sudokuGridLayout(scene);
    }

    if (scene.numberButtons) {
        numberButtonsLayout(scene);
    }

    if (scene.clearButton) {
        scene.clearButton.setPosition(width / 2, height - 40);
    }

    if (scene.backButton) {
        const fontSize = getResponsiveFontSize(scene, 20);
        scene.backButton.setFontSize(fontSize);
    }

    if (scene.difficultyButtons && scene.difficultyButtons.length > 0) {
        const scale = getResponsiveScale(scene,1);
        const stepY = configDifficultyButton.stepYOffset * scale;
        const startY = height / 2 - stepY;

        scene.difficultyButtons.forEach((btn, index) => {
            btn.setScale(scale);

            btn._baseScaleX = scale;
            btn._baseScaleY = scale;
            btn.setPosition(width / 2, startY + index * stepY);
        });
    }

    if (scene.difficultyTitleText) {
        const fontSize = getResponsiveFontSize(scene, configDifficultyButton.titleFontSize);
        scene.difficultyTitleText.setFontSize(fontSize);
        scene.difficultyTitleText.setPosition(width / 2, height * titleOffset);
    }

    if (scene.timerText) {
        timerLayout(scene);
    }

    if (scene.currentUserText && scene.currentUserText.text) {
        const fontSize = getResponsiveFontSize(scene, configFont.nicknameFontSize);
        scene.currentUserText.setFontSize(fontSize);
        scene.currentUserText.setPosition(width - 20, height - 20);
    }

    if (scene.mistakeText) {
        const gridY = scene.gridContainer.y;
        const gridTop = gridY - (scene.gridContainer.displayHeight) / 2;

        const fontSize = getResponsiveFontSize(scene, configSudokuLayout.miskateFontSize);

        scene.mistakeText.setFontSize(fontSize);
        scene.mistakeText.setPosition(scene.gridContainer.x + 75, gridTop - 10);
    }
}

export default updateLayout;