
const getResponsiveFontSize = (scene, baseSize) => {
    const scale = Math.min(
        scene.scale.width / 1280,
        scene.scale.height / 720
    );
    return Math.floor(baseSize * scale);
}

export default getResponsiveFontSize;