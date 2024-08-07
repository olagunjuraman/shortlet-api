import { Request, Response } from 'express';
import { RegionService } from '../services/regionService';
import { sendResponse } from '../utils/apiResponse';
import logger from '../utils/logger';

export class RegionController {
    private regionService: RegionService = new RegionService();
  
    public async getRegions(req: Request, res: Response): Promise<void> {
      try {
      const regions = await this.regionService.getRegionsWithStats();
      sendResponse(res, 200, true, "Regions retrieved successfully", regions);
      } catch (error) {
      logger.error('Error in getRegions:', error);
      sendResponse(res, 500, false, "Failed to retrieve regions. Please try again later.");
      }
      }
}