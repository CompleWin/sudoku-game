export const createRectangle = (scene, sizeWidth, sizeHeight, color, alpha) => {

    const {width, height} = scene.scale;

    const panelWidth = width * sizeWidth;
    const panelHeight = height * sizeHeight;

    const panel = scene.add.rectangle(
        width / 2,
        height / 2,
        panelWidth,
        panelHeight,
        color,
        alpha
    );

}

export const createRectangleWithStroke = (scene, sizeWidth, sizeHeight, color, alpha, strokeLine, strokeColor, strokeAlpha) => {

    const {width, height} = scene.scale;

    const panelWidth = width * sizeWidth;
    const panelHeight = height * sizeHeight;

    const panel = scene.add.rectangle(
        width / 2,
        height / 2,
        panelWidth,
        panelHeight,
        color,
        alpha
    );

    panel.setStrokeStyle(strokeLine, strokeColor, strokeAlpha);

}
