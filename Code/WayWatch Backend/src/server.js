// src/server.js
import http from 'http';
import app from './app.js';
import { initSocket } from './config/socket.js';
import { startTrafficMonitor } from './jobs/syncWeather.job.js';

const server = http.createServer(app);
initSocket(server);
startTrafficMonitor(); // Start background job

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
