import app from './app';
import mongoose from 'mongoose';
import logger from './utils/logger';
import { redisClient } from './config/redis';
import dotenv from 'dotenv';


dotenv.config()

import { scheduleCountryUpdates } from './jobs/updateCountriesJob';

const port = process.env.PORT || 3000;


const mongoUri = process.env.MONGO_URI as string;



const startServer = async () => {
  try {
  
  await redisClient.connect();
  logger.info('Connected to Redis');
  await mongoose.connect(mongoUri)
  logger.info('Connected to MongoDB');

  scheduleCountryUpdates();
logger.info('Country update job scheduled');
  
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
  } catch (error) {
  logger.error('Failed to start the server:', error);
  process.exit(1);
  }
  };

startServer();

