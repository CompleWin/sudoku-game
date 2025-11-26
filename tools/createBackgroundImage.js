
const createBackgroundImage = (scene) => {
    return scene.bg = scene.add.image(0, 0, 'bg_menu')
        .setOrigin(0)
        .setDisplaySize(scene.scale.width, scene.scale.height);
}

export default createBackgroundImage;