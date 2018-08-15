module.exports = windowAzimuthDegrees => msg => ({
    phi: (((msg.payload.azimuth - windowAzimuthDegrees) / 180) * Math.PI),
    theta: (msg.payload.altitude / 180) * Math.PI,
    sunInSky: msg.payload.sunInSky !== undefined ? msg.payload.sunInSky : true,
});
