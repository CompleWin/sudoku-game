import getResponsiveScale from "../responvisve/getResponsiveScale.js";

const sudokuGridLayout = (scene) => {
    const { width, height } = scene.scale;

    const scale = getResponsiveScale(scene, 1);

    const baseGridWidth = scene.gridBackground.width;
    const baseGridHeight = scene.gridBackground.height;

    const gridWidth = baseGridWidth * scale;
    const gridHeight = baseGridHeight * scale;

    const gridX = width / 2 - gridWidth / 2;
    const gridY = height / 2 - gridHeight / 2;

    scene.gridContainer.setScale(scale);
    scene.gridContainer.setPosition(gridX, gridY);

    scene.gridBottomY = gridY + gridHeight;
}

export default sudokuGridLayout;