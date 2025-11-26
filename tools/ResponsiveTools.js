
export function getResponsiveFontSize(scene, baseSize) {
    const scale = Math.min(
        scene.scale.width / 1280,
        scene.scale.height / 720
    );
    return Math.floor(baseSize * scale);
}

export function getResponsiveScale(scene, baseScale) {
    const scale = Math.min(
        scene.scale.width / 1280,
        scene.scale.height / 720
    );
    return baseScale * scale;
}

