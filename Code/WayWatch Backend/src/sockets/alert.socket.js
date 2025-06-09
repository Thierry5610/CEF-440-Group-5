import { getIO } from '../config/socket.js';
import { userLocations } from './userLocationStore.js';
import logger from '../utils/logger.js';

// Haversine formula for geo-distance
const haversineDistance = (coord1, coord2) => {
  const toRad = deg => (deg * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);

  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(coord1.lat)) *
            Math.cos(toRad(coord2.lat)) *
            Math.sin(dLng / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const emitAlertToNearbyUsers = (alert) => {
  const io = getIO();
  const { location } = alert;

  for (const [socketId, user] of userLocations.entries()) {
    const distance = haversineDistance(location, { lat: user.lat, lng: user.lng });
    if (distance <= 5) {
      io.to(socketId).emit('newAlert', alert);
      logger.info(`🚨 Alert sent to ${user.userId} (${socketId}) [${distance.toFixed(2)} km]`);
    }
  }
};
