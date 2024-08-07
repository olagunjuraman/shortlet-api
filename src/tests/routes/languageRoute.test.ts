import request from 'supertest';
import express from 'express';
import languageRoutes from '../../routes/languageRoutes';
import { LanguageService } from '../../services/languageService';
jest.mock('../../services/languageService');
const app = express();
app.use(express.json());
app.use('/api/languages', languageRoutes);
describe('Language Routes', () => {
beforeEach(() => {
jest.clearAllMocks();
});


// describe('GET /api/languages', () => {
// it('should return a list of languages with stats', async () => {
// const mockLanguages = [{ language: 'English', totalSpeakers: 1000000, countries: ['USA', 'UK'], countryCount: 2 }];
// (LanguageService.prototype.getLanguagesWithStats as jest.Mock).mockResolvedValue(mockLanguages);
// const res = await request(app).get('/api/languages');
//   expect(res.status).toBe(200);
//   expect(res.body).toEqual(mockLanguages);
// });
// });
// });


// In your language routes test file
describe('GET /api/languages', () => {
    it('should return a list of languages with stats', async () => {
      const mockLanguages = [{ language: 'English', totalSpeakers: 1000000, countries: ['USA', 'UK'], countryCount: 2 }];
      (LanguageService.prototype.getLanguagesWithStats as jest.Mock).mockResolvedValue(mockLanguages);
  
      const res = await request(app).get('/api/languages');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: "Languages retrieved successfully",
        data: mockLanguages
      });
    });
  
    it('should handle errors gracefully', async () => {
      (LanguageService.prototype.getLanguagesWithStats as jest.Mock).mockRejectedValue(new Error('Database error'));
  
      const res = await request(app).get('/api/languages');
      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "Failed to retrieve languages. Please try again later."
      });
    });
  });

})