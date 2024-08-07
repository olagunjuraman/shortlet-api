import cron from 'node-cron';
import { DataFetchService } from '../utils/dataFetchService';
import logger from '../utils/logger';


export const scheduleCountryUpdates = (): void => {
  cron.schedule('0 0 * * *', async () => {
    logger.info('Starting daily country data update');
    try {
      await DataFetchService.getInstance().fetchAndStoreCountries();
      logger.info('Daily country data update completed successfully');
    } catch (error) {
      logger.error('Error during daily country data update:', error);
    }
  });
};