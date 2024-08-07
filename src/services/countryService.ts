
import mongoose from 'mongoose';
import Country, { ICountry }  from '../models/country';
import { redisClient } from '../config/redis';

interface FilterOptions {
  page: number;
  limit: number;
  region?: string;
  populationMin?: number;
  populationMax?: number;
  search?: string;
  sort?: string;
}


interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    }

    interface BorderingCountry {
          name: string;
          officialName: string;
          }
       

export class CountryService {

  private getCacheKey(options: FilterOptions): string {
    return `countries:${JSON.stringify(options)}`
  }

  public async getCountries(options: FilterOptions): Promise<PaginatedResponse<ICountry>> {

    const cacheKey = this.getCacheKey(options);
    const cachedData = await redisClient.client.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const query = this.buildQuery(options);
    const total = await Country.countDocuments(query.getFilter());
    
    // Execute find query
    const countries = await query
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .lean()
      .exec();


      const result: PaginatedResponse<ICountry> = {
        data: countries,
        total,
        page: options.page,
        limit: options.limit,
        totalPages: Math.ceil(total / options.limit)
      };
      
      // Cache for 1 hour
      await redisClient.client.setEx(cacheKey, 3600, JSON.stringify(result));
      
      return result;
  }


  public async clearCache(): Promise<void> {
    const keys = await redisClient.client.keys('countries:*');
    if (keys.length > 0) {
    await redisClient.client.del(keys);
    }
    }


  private buildQuery(options: FilterOptions): mongoose.Query<ICountry[], ICountry> {
    let query = Country.find();
    if (options.region) {
      query = query.where('region').equals(options.region);
    }
    
    if (options.populationMin) {
      query = query.where('population').gte(options.populationMin);
    }
    
    if (options.populationMax) {
      query = query.where('population').lte(options.populationMax);
    }
    
    if (options.search) {
      query = query.or([
        { name: new RegExp(options.search, 'i') },
        { officialName: new RegExp(options.search, 'i') },
        { capital: new RegExp(options.search, 'i') },
        { languages: new RegExp(options.search, 'i') }
      ]);
    }
    
    if (options.sort) {
      const [field, order] = options.sort.split(':');
      query = query.sort({ [field]: order === 'desc' ? -1 : 1 });
    } else {
      query = query.sort({ name: 1 });
    }
    
    return query;
    }



  public async getCountryDetails(id: string): Promise<any>  {
    const country = await Country.findById(id).lean().exec() as ICountry | null;

    if (!country) {
      return null;
      }

      let borderingCountries: BorderingCountry[] = [];
if (country.borders && country.borders.length > 0) {
  borderingCountries = await Country.find({ 

       cca3: { $in: country.borders } 
    
  })
  .select('name officialName')
  .lean()
  .exec();
}

  return {
    ...country,
    borderingCountries
  };
  }


  public async updateCountries(countries: ICountry[]): Promise<void> {
    for (const country of countries) {
    await Country.findOneAndUpdate({ name: country.name }, country, { upsert: true });
    }
    await this.clearCache();
    }
    
  }