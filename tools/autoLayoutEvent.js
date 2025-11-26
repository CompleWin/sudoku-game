
const autoLayoutEvent = (scene, layoutFn) => {
    
    layoutFn(scene);
    
    scene._autoLayoutHandler = () => layoutFn(scene);
    scene.scale.on('resize', scene._autoLayoutHandler, scene);

    scene.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
        if (scene._autoLayoutHandler) {
            scene.scale.off('resize', scene._autoLayoutHandler, scene);
            scene._autoLayoutHandler = null;
        }
    });

    scene.events.on(Phaser.Scenes.Events.DESTROY, () => {
        if (scene._autoLayoutHandler) {
            scene.scale.off('resize', scene._autoLayoutHandler, scene);
            scene._autoLayoutHandler = null;
        }
    });
    
}

export default autoLayoutEvent;