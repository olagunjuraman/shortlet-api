import request from 'supertest';
import express from 'express';
import regionRoutes from '../../routes/regionRoutes';
import { RegionService } from '../../services/regionService';
jest.mock('../../services/regionService');
const app = express();
app.use(express.json());
app.use('/api/regions', regionRoutes);
describe('Region Routes', () => {
beforeEach(() => {
jest.clearAllMocks();
});
describe('GET /api/regions', () => {
    it('should return a list of regions with stats', async () => {
      const mockRegions = [{ region: 'Europe', totalPopulation: 1000000, avgPopulation: 500000, countryCount: 2 }];
      (RegionService.prototype.getRegionsWithStats as jest.Mock).mockResolvedValue(mockRegions);
  
      const res = await request(app).get('/api/regions');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: "Regions retrieved successfully",
        data: mockRegions
      });
    });
  
    it('should handle errors gracefully', async () => {
      (RegionService.prototype.getRegionsWithStats as jest.Mock).mockRejectedValue(new Error('Database error'));
  
      const res = await request(app).get('/api/regions');
      expect(res.status).toBe(500);
      expect(res.body).toEqual({
        success: false,
        message: "Failed to retrieve regions. Please try again later."
      });
    });
  });

})