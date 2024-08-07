import { LanguageService } from '../../services/languageService';
import Country from '../../models/country';
jest.mock('../../models/country');
describe('LanguageService', () => {
let languageService: LanguageService;
beforeEach(() => {
languageService = new LanguageService();
jest.clearAllMocks();
});
describe('getLanguagesWithStats', () => {
it('should return languages with stats', async () => {
const mockAggregateResult = [
{ language: 'English', totalSpeakers: 1000000, countries: ['USA', 'UK'], countryCount: 2 }
];
(Country.aggregate as jest.Mock).mockResolvedValue(mockAggregateResult);
const result = await languageService.getLanguagesWithStats();

  expect(result).toEqual(mockAggregateResult);
  expect(Country.aggregate).toHaveBeenCalled();
});
});


});