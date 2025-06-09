import Location from '../models/location.js';
import logger from '../utils/logger.js';

export const updateUserLocation = async (userId, { latitude, longitude }) => {
  try {
    if (!latitude || !longitude) {
      throw new Error('Latitude and longitude are required');
    }

    const location = await Location.findOneAndUpdate(
      { userId },
      {
        userId,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        timestamp: new Date(),
      },
      { upsert: true, new: true }
    );

    logger.info(`Location updated for user ${userId}: ${latitude}, ${longitude}`);
    return location;
  } catch (error) {
    logger.error(`Error updating location for user ${userId}: ${error.message}`);
    throw error;
  }
};

export const getNearbyUsers = async ({ latitude, longitude }, radius = 5000) => {
  try {
    const users = await Location.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [longitude, latitude] },
          $maxDistance: radius, // in meters
        },
      },
    });
    return users;
  } catch (error) {
    logger.error(`Error fetching nearby users: ${error.message}`);
    throw error;
  }
};