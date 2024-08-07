import axios from 'axios';
import Country, { ICountry } from '../models/country';
import logger from './logger';

interface Demonyms {
  [key: string]: { f: string; m: string };
}

export class DataFetchService {
  private static instance: DataFetchService;

  private constructor() {}

  public static getInstance(): DataFetchService {
    if (!DataFetchService.instance) {
      DataFetchService.instance = new DataFetchService();
    }
    return DataFetchService.instance;
  }

  public async fetchAndStoreCountries(): Promise<void> {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all' || process.env.COUNTRY_API as string);
      const countries = response.data;

      for (const countryData of countries) {
        const processedData = this.processCountryData(countryData);
        const cleanedData = this.cleanCountryData(processedData);
        await this.upsertCountry(cleanedData);
      }

      logger.info(`Successfully fetched and stored ${countries.length} countries`);
    } catch (error) {
      logger.error('Error fetching and storing countries:', error);
      throw error;
    }
  }

  private processCountryData(rawData: any): Partial<ICountry> {
    return {
      name: rawData.name.common,
      officialName: rawData.name.official,
      region: rawData.region,
      subregion: rawData.subregion,
      population: rawData.population,
      area: rawData.area,
      cca3: rawData.cca3,
      capital: rawData.capital,
      languages: rawData.languages ? Object.values(rawData.languages) : [],
      currencies: rawData.currencies ? Object.entries(rawData.currencies).map(([code, details]: [string, any]) => ({
        code,
        name: details.name,
        symbol: details.symbol
      })) : [],
      borders: rawData.borders,
      translations: rawData.translations ? Object.entries(rawData.translations).reduce<any>((acc, [lang, details]) => {
      const typedDetails = details as { official: string; common: string };
      acc[lang] = {
        official: typedDetails.official,
        common: typedDetails.common
      };
  return acc;
      }, {}) : {},
      altSpellings: Array.isArray(rawData.altSpellings) ? rawData.altSpellings : [],
      tld: Array.isArray(rawData.tld) ? rawData.tld : [], 
      demonyms: rawData.demonyms ? Object.entries(rawData.demonyms).reduce<Demonyms>((acc, [lang, value]) => {
        const typedValue = value as { f: string; m: string };
        acc[lang] = { f: typedValue.f, m: typedValue.m };
        return acc;
      }, {}) : {},
      flags: rawData.flags,
      latlng: rawData.latlng,
      timezones: rawData.timezones
    };
  }

  private async upsertCountry(countryData: Partial<ICountry>): Promise<void> {
    await Country.findOneAndUpdate(
      { name: countryData.name },
      countryData,
      { upsert: true, new: true, runValidators: true }
    );
  }


  private cleanCountryData(data: Partial<ICountry>): Partial<ICountry> {
    return {
      ...data,
      name: data.name?.trim() || 'Unknown',
      population: Math.max(0, data.population || 0),
      area: Math.max(0, data.area || 0),
      languages: Array.from(new Set(data.languages || [])), 
      capital: data.capital?.filter(Boolean) || [], 
      borders: data.borders?.filter(Boolean) || [], 
      timezones: data.timezones?.filter(Boolean) || [] 
    };
  }
}