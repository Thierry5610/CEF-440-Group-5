import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js'
import reportRoutes from './routes/report.routes.js'
import alertRoutes from './routes/alert.routes.js'
import locationRoutes from './routes/location.routes.js';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middlewares/error.middleware.js';
import roadsignRoutes from './routes/roadsign.routes.js'

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user',  userRoutes)
app.use('/api/v1/location', locationRoutes);
app.use('/api/v1/roadsign', roadsignRoutes);
app.use('/api/v1/road', reportRoutes);
app.use('/api/v1/alert', alertRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
