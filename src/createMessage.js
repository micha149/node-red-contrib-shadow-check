module.exports = topic => inShadow => ({
    topic,
    payload: {
        sunInWindow: !inShadow,
    },
});
