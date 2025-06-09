import * as LocationService from '../services/location.service.js';
import logger from '../utils/logger.js';

export const updateLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const userId = req.user.id; // Assumes auth middleware sets req.user
    const location = await LocationService.updateUserLocation(userId, { latitude, longitude });
    res.status(200).json({ message: 'Location updated', data: location });
  } catch (error) {
    logger.error(`Error in updateLocation: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};