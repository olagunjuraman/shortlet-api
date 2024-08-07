import { Request, Response } from 'express';
import { CountryService } from '../services/countryService';
import logger from '../utils/logger';
import { sendResponse } from '../utils/apiResponse';

export class CountryController {
    private countryService: CountryService = new CountryService();
    public async getCountries(req: Request, res: Response): Promise<void> {
      const { 
        page = 1, 
        limit = 10, 
        region, 
        populationMin, 
        populationMax,
        sort
      } = req.query;
      
      try {
        const countries = await this.countryService.getCountries({
          page: Number(page),
          limit: Number(limit),
          region: region as string,
          populationMin: Number(populationMin),
          populationMax: Number(populationMax),
          sort: sort as string
        });

        sendResponse(res, 200, true, "Countries retrieved successfully", countries);      
      } catch (error) {
        logger.error('Error in getCountries:', error);

        sendResponse(res, 500, false, "Failed to retrieve countries", undefined, "Internal server error");
      }
    }

    public async getCountryDetails(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        
        try {
          const country = await this.countryService.getCountryDetails(id);
          
          if (!country) {
            sendResponse(res, 404, false, "Country not found", undefined, "Country with the specified ID does not exist");
            return;
          }
          
          sendResponse(res, 200, true, "Country details retrieved successfully", country);
        } catch (error) {
          logger.error('Error in getCountryDetails:', error);
          sendResponse(res, 500, false, "Failed to retrieve countries", undefined, "Internal server error");
        }
      }
  }
  