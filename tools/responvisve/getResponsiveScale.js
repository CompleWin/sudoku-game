
const getResponsiveScale = (scene, baseScale) => {
    const scale = Math.min(
        scene.scale.width / 1280,
        scene.scale.height / 720
    );
    return baseScale * scale;
}

export default getResponsiveScale;