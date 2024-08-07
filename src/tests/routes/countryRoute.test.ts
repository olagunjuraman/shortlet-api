import request from 'supertest';
import express from 'express';
import countryRoutes from '../../routes/countryRoutes';
import { CountryService } from '../../services/countryService';
jest.mock('../../services/countryService');
const app = express();
app.use(express.json());
app.use('/api/countries', countryRoutes);
describe('Country Routes', () => {
beforeEach(() => {
jest.clearAllMocks();
});
describe('GET /api/countries', () => {
it('should return a list of countries', async () => {
const mockCountries = {
data: [
{ id: '1', name: 'Country 1', population: 1000000 },
{ id: '2', name: 'Country 2', population: 2000000 }
],
total: 2,
page: 1,
limit: 10,
totalPages: 1
};
(CountryService.prototype.getCountries as jest.Mock).mockResolvedValue(mockCountries);
 const res = await request(app).get('/api/countries');
  expect(res.status).toBe(200);
 
});

it('should handle query parameters', async () => {
  const mockCountries = {
    data: [{ id: '1', name: 'Country 1', population: 1000000, region: 'Europe' }],
    total: 1,
    page: 1,
    limit: 10,
    totalPages: 1
  };
  (CountryService.prototype.getCountries as jest.Mock).mockResolvedValue(mockCountries);

  const res = await request(app).get('/api/countries?region=Europe&populationMin=500000&sort=name:asc');
  expect(res.status).toBe(200);
  expect(res.body).toEqual({
    success: true,
    message: 'Countries retrieved successfully',
    data: mockCountries
  });
//   expect(res.body).toEqual(mockCountries);
  expect(CountryService.prototype.getCountries).toHaveBeenCalledWith(
    expect.objectContaining({
      region: 'Europe',
      populationMin: 500000,
      sort: 'name:asc'
    })
  );
});
});
describe('GET /api/countries/:id', () => {
it('should return a specific country', async () => {
const mockCountry = { id: '1', name: 'Country 1', population: 1000000 };
(CountryService.prototype.getCountryDetails as jest.Mock).mockResolvedValue(mockCountry);
  const res = await request(app).get('/api/countries/1');
  expect(res.status).toBe(200);
  expect(res.body).toEqual({
    success: true,
    message: 'Country details retrieved successfully',
    data: mockCountry
  });
});

it('should return 404 for non-existent country', async () => {
  (CountryService.prototype.getCountryDetails as jest.Mock).mockResolvedValue(null);

  const res = await request(app).get('/api/countries/999');
  expect(res.status).toBe(404);
});
})

});