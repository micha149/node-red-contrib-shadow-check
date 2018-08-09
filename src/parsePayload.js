module.exports = windowAzimuthDegrees => msg => ({
    phi: (((msg.payload.azimuth - windowAzimuthDegrees) / 180) * Math.PI),
    theta: msg.payload.altitudeRadians,
    sunInSky: msg.payload.sunInSky !== undefined ? msg.payload.sunInSky : true,
});
