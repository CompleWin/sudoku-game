const opponentProgress = (scene) => {
    scene.socket.on('opponentProgress', ({emptyCells}) => {
        if (scene.opponentProgressText) {
            scene.opponentProgressText.setText(
                `У соперника осталось\n${emptyCells} свободных клеток`
            );
        }
    });
}

export default opponentProgress;