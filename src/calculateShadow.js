const intersect = require('ray-plane-intersection');
const { negate } = require('gl-vec3');

module.exports = (
    overhang,
    overhangOffsetLeft,
    overhangOffsetRight,
    overhangOffsetTop,
) => (sunPos) => {
    const { phi, theta, sunInSky } = sunPos;
    let shadowShape = null;

    const sunDirection = [
        -Math.sin(phi) * Math.cos(theta),
        Math.sin(theta),
        -Math.cos(theta) * Math.cos(phi),
    ];

    const shadowDirection = negate([], sunDirection);

    const topLeft = [-overhangOffsetLeft, overhangOffsetTop, -overhang];

    const bottomLeft = intersect(
        [],
        topLeft,
        shadowDirection,
        [0, 0, 1],
        0,
    );

    const topRight = [overhangOffsetRight, overhangOffsetTop, -overhang];

    const bottomRight = intersect(
        [],
        topRight,
        shadowDirection,
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
