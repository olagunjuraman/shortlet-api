import { Request, Response } from 'express';
import { LanguageService } from '../services/languageService';
import { sendResponse } from '../utils/apiResponse';
import logger from '../utils/logger';

export class LanguageController {
  private languageService: LanguageService = new LanguageService();
  public async getLanguages(req: Request, res: Response): Promise<void> {
    try {
    const languages = await this.languageService.getLanguagesWithStats();
    sendResponse(res, 200, true, "Languages retrieved successfully", languages);
    } catch (error) {
    logger.error('Error in getLanguages:', error);
    sendResponse(res, 400, false, "Failed to retrieve languages. Please try again later.");
    }
    }
}