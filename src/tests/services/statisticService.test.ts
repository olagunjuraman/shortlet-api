
// import Country from '../../models/country';
// import { StatisticsService } from '../../services/statisticService';
// jest.mock('../../models/country');
// describe('StatisticsService', () => {
// let statisticsService: StatisticsService;
// beforeEach(() => {
// statisticsService = new StatisticsService();
// jest.clearAllMocks();
// });
// describe('getGlobalStatistics', () => {
// it('should return global statistics', async () => {
// (Country.countDocuments as jest.Mock).mockResolvedValue(200);
// (Country.findOne as jest.Mock).mockImplementation((criteria) => ({
// sort: jest.fn().mockReturnThis(),
// select: jest.fn().mockResolvedValue(criteria.mockData)
// }));
// (Country.aggregate as jest.Mock).mockResolvedValue([{ language: 'English', totalSpeakers: 1000000 }]);
//   const result = await statisticsService.getGlobalStatistics();

//   expect(result).toHaveProperty('totalCountries', 200);
//   expect(result).toHaveProperty('largestCountryByArea');
//   expect(result).toHaveProperty('smallestCountryByPopulation');
//   expect(result).toHaveProperty('mostSpokenLanguage');
//   expect(Country.countDocuments).toHaveBeenCalled();
//   expect(Country.findOne).toHaveBeenCalledTimes(2);
//   expect(Country.aggregate).toHaveBeenCalled();
// });
// });
// });



import { StatisticsService } from '../../services/statisticService';
import Country from '../../models/country';
jest.mock('../../models/country');
describe('StatisticsService', () => {
let statisticsService: StatisticsService;
beforeEach(() => {
statisticsService = new StatisticsService();
jest.clearAllMocks();
});
describe('getGlobalStatistics', () => {
it('should return global statistics', async () => {
(Country.countDocuments as jest.Mock).mockResolvedValue(200);
(Country.findOne as jest.Mock).mockImplementation(() => ({
sort: jest.fn().mockReturnThis(),
select: jest.fn().mockResolvedValue({ name: 'TestCountry', area: 100000, population: 1000000 })
}));
(Country.aggregate as jest.Mock).mockResolvedValue([{ language: 'English', totalSpeakers: 1000000 }]);
 const result = await statisticsService.getGlobalStatistics();

  expect(result).toHaveProperty('totalCountries', 200);
  expect(result).toHaveProperty('largestCountryByArea');
  expect(result).toHaveProperty('smallestCountryByPopulation');
  expect(result).toHaveProperty('mostSpokenLanguage');
  expect(Country.countDocuments).toHaveBeenCalled();
  expect(Country.findOne).toHaveBeenCalledTimes(2);
  expect(Country.aggregate).toHaveBeenCalled();
});
});
});