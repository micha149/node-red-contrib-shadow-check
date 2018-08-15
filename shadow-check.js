const parseAndNormalizePayload = require('./src/parsePayload');
const calculateShadow = require('./src/calculateShadow');
const checkIfWindowInShadow = require('./src/checkIfWindowInShadow');
const createMessage = require('./src/createMessage');
const { pipe } = require('ramda');

module.exports = (RED) => {
    function ShadowCheck(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        const width = parseInt(config.width, 10);
        const height = parseInt(config.height, 10);
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        const inset = parseInt(config.inset, 10);
        const azimuth = parseInt(config.azimuth, 10);
        const overhang = parseInt(config.overhang, 10);
        const overhangLeft = parseInt(config.overhangOffsetLeft, 10);
        const overhangRight = parseInt(config.overhangOffsetRight, 10);
        const overhangTop = parseInt(config.overhangOffsetTop, 10);
        const topic = config.topic || 'sunInWindow';

        const handleIncomingMessage = pipe(
            parseAndNormalizePayload(azimuth),
            calculateShadow(
                overhang,
                overhangLeft + halfWidth,
                overhangRight + halfWidth,
                overhangTop + halfHeight,
            ),
            checkIfWindowInShadow(width, height, inset),
            createMessage(topic),
            node.send.bind(node),
        );

        node.on('input', msg => handleIncomingMessage(msg));
    }

    RED.nodes.registerType('shadow-check', ShadowCheck);
}
