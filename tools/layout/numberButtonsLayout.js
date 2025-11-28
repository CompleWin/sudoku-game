import getResponsiveScale from "../responvisve/getResponsiveScale.js";

const numberButtonsLayout = (scene) => {
    const { width, height } = scene.scale;

    const scale = getResponsiveScale(scene, 1);

    const buttonSpacing = 60 * scale;
    const startX = width / 2 - (buttonSpacing * 4);

    const offsetBottom = 60 * scale;
    const baseY = scene.gridBottomY + offsetBottom;


    scene.numberButtons.forEach((btn, i) => {
        btn.setPosition(startX + i * buttonSpacing, baseY);
    });

}

export default numberButtonsLayout;