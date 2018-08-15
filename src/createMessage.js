module.exports = topic => windowCompletelyInShadow => ({
    topic,
    payload: !windowCompletelyInShadow,
});
