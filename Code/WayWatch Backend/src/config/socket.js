import { Server } from 'socket.io';
import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import { userLocations } from '../sockets/userLocationStore.js'; // shared store

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.NODE_ENV === 'production'
        ? (process.env.ALLOWED_ORIGINS?.split(',') ?? ['https://api.waywatch.com'])
        : ['http://localhost:3000', 'http://localhost:5173'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    // Save location to DB and in-memory map
    socket.on('updateLocation', async ({ userId, longitude, latitude }) => {
      try {
        const Location = mongoose.model('Location');
        await Location.create({
          userId,
          location: { type: 'Point', coordinates: [longitude, latitude] },
        });

        userLocations.set(socket.id, { userId, lat: latitude, lng: longitude });
        logger.info(`Location saved for ${userId}: [${longitude}, ${latitude}]`);

        io.emit('locationUpdated', { userId, longitude, latitude });
      } catch (err) {
        logger.error(`Location update error: ${err.message}`);
        socket.emit('error', { message: 'Failed to update location' });
      }
    });

    socket.on('disconnect', () => {
      logger.info(`Socket disconnected: ${socket.id}`);
      userLocations.delete(socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};
