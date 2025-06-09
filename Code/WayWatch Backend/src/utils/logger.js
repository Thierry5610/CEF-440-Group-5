// src/utils/logger.js
import winston from 'winston';
// import 'winston-daily-rotate-file'; // Optional for daily log rotation

const isProduction = process.env.NODE_ENV === 'production';

// Define formats
const formats = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Optional: Human-readable format for dev console
const devConsoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.simple()
);

// Define transports
const transports = [
  new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  new winston.transports.File({ filename: 'logs/combined.log' }),
];

// Add console output
transports.push(
  new winston.transports.Console({
    format: isProduction ? formats : devConsoleFormat,
  })
);

// Optional: Daily rotating file logs
// transports.push(
//   new winston.transports.DailyRotateFile({
//     dirname: 'logs',
//     filename: 'app-%DATE%.log',
//     datePattern: 'YYYY-MM-DD',
//     zippedArchive: true,
//     maxSize: '20m',
//     maxFiles: '14d',
//   })
// );

// Create logger
const logger = winston.createLogger({
  level: 'info',
  format: formats,
  transports,
  exitOnError: false,
});

// Global error handlers (optional but recommended)
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
});

export default logger;
