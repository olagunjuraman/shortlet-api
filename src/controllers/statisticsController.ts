import { Request, Response } from 'express';
import { StatisticsService } from '../services/statisticService';
import { sendResponse } from '../utils/apiResponse';
import logger from '../utils/logger';


export class StatisticsController {
  private statisticsService: StatisticsService = new StatisticsService();
  public async getStatistics(req: Request, res: Response): Promise<void> {
    try {
    const statistics = await this.statisticsService.getGlobalStatistics();
    sendResponse(res, 200, true, "Global statistics retrieved successfully", statistics);
    } catch (error) {
    logger.error('Error in getStatistics:', error);
    sendResponse(res, 500, false, "Failed to retrieve global statistics. Please try again later.");
    }
    }
}
