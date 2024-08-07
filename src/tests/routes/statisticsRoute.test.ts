import request from 'supertest';
import express from 'express';
import statisticsRoutes from '../../routes/statisticsRoutes';
import { StatisticsService } from '../../services/statisticService';

jest.mock('../../services/statisticService');
const app = express();
app.use(express.json());
app.use('/api/statistics', statisticsRoutes);
describe('Statistics Routes', () => {
beforeEach(() => {
jest.clearAllMocks();
});

describe('GET /api/statistics', () => {
  it('should return global statistics', async () => {
    const mockStats = {
      totalCountries: 195,
      totalPopulation: 7800000000,
    };
    (StatisticsService.prototype.getGlobalStatistics as jest.Mock).mockResolvedValue(mockStats);

    const res = await request(app).get('/api/statistics');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: "Global statistics retrieved successfully",
      data: mockStats
    });
  });

  it('should handle errors gracefully', async () => {
    (StatisticsService.prototype.getGlobalStatistics as jest.Mock).mockRejectedValue(new Error('Database error'));
    const res = await request(app).get('/api/statistics');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      success: false,
      message: "Failed to retrieve global statistics. Please try again later."
    });
  });
});

})