import { RegionService } from '../../services/regionService';
import Country from '../../models/country';
jest.mock('../../models/country');
describe('RegionService', () => {
let regionService: RegionService;
beforeEach(() => {
regionService = new RegionService();
jest.clearAllMocks();
});
describe('getRegionsWithStats', () => {
it('should return regions with stats', async () => {
const mockAggregateResult = [
{
region: 'Europe',
totalPopulation: 1000000,
avgPopulation: 500000,
countryCount: 2,
countries: [{ name: 'France', population: 600000 }, { name: 'Germany', population: 400000 }]
}
];
(Country.aggregate as jest.Mock).mockResolvedValue(mockAggregateResult);
 const result = await regionService.getRegionsWithStats();

  expect(result).toEqual(mockAggregateResult);
  expect(Country.aggregate).toHaveBeenCalled();
});
});
});