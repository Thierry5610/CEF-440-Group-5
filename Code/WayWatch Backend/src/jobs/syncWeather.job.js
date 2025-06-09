import logger from '../utils/logger.js'; // Change to default import
import { emitAlertToNearbyUsers } from '../sockets/alert.socket.js';

// Simulated traffic check (replace with actual API later)
const checkTraffic = () => {
  const trafficLevel = Math.random(); // 0 to 1
  if (trafficLevel > 0.7) {
    const alert = {
      type: 'traffic',
      severity: 'high',
      message: 'Heavy traffic reported in your area.',
      timestamp: new Date(),
    };
    emitAlertToNearbyUsers(alert);
    logger.info('Traffic alert emitted');
  }
};

export const startTrafficMonitor = () => {
  setInterval(checkTraffic, 5 * 60 * 1000); // every 5 minutes
};