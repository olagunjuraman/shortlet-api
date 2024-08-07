import { CountryService } from '../../services/countryService';
import Country from '../../models/country';

jest.mock('../../models/country');
jest.mock('../../config/redis');

describe('CountryService', () => {
    let countryService: CountryService;

    beforeEach(() => {
        countryService = new CountryService();
        jest.clearAllMocks();
    });

  
    describe('getCountries', () => {
        it('should return paginated countries', async () => {
            const mockCountries = [{ name: 'Country 1' }, { name: 'Country 2' }];
            const mockFilter = {};
            const mockQuery = {
                sort: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
                lean: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(mockCountries),
                getFilter: jest.fn().mockReturnValue(mockFilter),
            };
            (Country.find as jest.Mock).mockReturnValue(mockQuery);
            (Country.countDocuments as jest.Mock).mockResolvedValue(2);
    
            const result = await countryService.getCountries({ page: 1, limit: 10 });
    
            expect(result.data).toEqual(mockCountries);
            expect(result.total).toBe(2);
            expect(result.page).toBe(1);
            expect(result.limit).toBe(10);
            expect(result.totalPages).toBe(1);
    
            expect(mockQuery.sort).toHaveBeenCalledWith({ name: 1 });

            expect(Country.countDocuments).toHaveBeenCalledWith(mockFilter);
        });


    })
   
});
