import { emitAlertToNearbyUsers } from '../sockets/alert.socket.js';
import { STATUS_CODES } from '../constants/statusCodes.js';

export const sendManualAlert = (req, res) => {
  const { type, message, severity, location } = req.body;

  if (!type || !message || !location?.lat || !location?.lng) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: 'type, message, and location { lat, lng } are required',
    });
  }

  const alert = {
    type,
    message,
    severity: severity || 'medium',
    location,
    timestamp: new Date(),
  };

  emitAlertToNearbyUsers(alert);

  return res.status(STATUS_CODES.OK).json({
    success: true,
    alert,
  });
};
