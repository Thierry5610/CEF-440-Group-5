import mongoose from 'mongoose';
import Location from '../models/location.js';
import logger from '../utils/logger.js';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in the .env file');
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('MongoDB connected');

    // Ensure geospatial index on Location collection
    await Location.createIndexes({ location: '2dsphere' });
    logger.info('Geospatial index ensured on Location collection');
  } catch (error) {
    logger.error('MongoDB connection error:', { error: error.message });
    process.exit(1);
  }
};