const intersect = require('ray-plane-intersection');

module.exports = (
    overhang,
    overhangOffsetLeft,
    overhangOffsetRight,
    overhangOffsetTop,
) => (sunPos) => {
    const { phi, theta, sunInSky } = sunPos;
    let shadowShape = null;

    const sunDirection = [
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi),
        -Math.cos(phi) * Math.cos(theta),
    ];

    const topLeft = [-overhangOffsetLeft, overhangOffsetTop, overhang];

    const bottomLeft = intersect(
        [],
        topLeft,
        sunDirection,
        [0, 0, 1],
        0,
    );

    const topRight = [overhangOffsetRight, overhangOffsetTop, overhang];

    const bottomRight = intersect(
        [],
        topRight,
        sunDirection,
        [0, 0, 1],
        0,
    );

    if (sunInSky && bottomLeft && bottomRight) {
        shadowShape = [
            [topLeft[0], topLeft[1]],
            [topRight[0], topRight[1]],
            [bottomRight[0], bottomRight[1]],
            [bottomLeft[0], bottomLeft[1]],
        ];
    }

    return {
        phi, theta, shadowShape,
    };
};
