
const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const mStr = minutes < 10 ? "0" + minutes : String(minutes);
    const sStr = seconds < 10 ? "0" + seconds : String(seconds);
    return `${mStr}:${sStr}`;
}

export default formatTime;