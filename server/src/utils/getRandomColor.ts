export const getRandomHexCodeColor = (maxColorValue = 16777215) => `#${Math.floor(Math.random() * maxColorValue).toString(16)}`;
export const getRandomRGBColor = (maxRedColorValue = 255, maxGreenColorValue = 255, maxBlueColorValue = 255, withAlpha = false) => {
    const r = Math.floor(Math.random() * maxRedColorValue);
    const g = Math.floor(Math.random() * maxGreenColorValue);
    const b = Math.floor(Math.random() * maxBlueColorValue);
    // Minimum alpha that this function returns is 0.5 and max is 1
    const a = withAlpha ? (Math.random() / 2 + 0.5).toFixed(2) : 1;
    return [r, g, b, a];
};
