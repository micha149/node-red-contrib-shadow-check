const pointInPoly = require('point-in-polygon');

module.exports = (width, height) => ({ shadowShape }) => {
    const pointInShadow = point => pointInPoly(point, shadowShape);
    const bottom = -height / 2;
    const left = -width / 2;
    const right = width / 2;
    const top = height / 2;

    if (!shadowShape) {
        return true;
    }

    return pointInShadow([left, top])
        && pointInShadow([right, top])
        && pointInShadow([right, bottom])
        && pointInShadow([left, bottom]);
};
