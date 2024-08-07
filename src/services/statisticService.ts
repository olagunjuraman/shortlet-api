import  Country  from '../models/country';

export class StatisticsService {
 
  public async getGlobalStatistics(): Promise<any> {
    const [
      totalCountries,
      largestByArea,
      smallestByPopulation,
      mostSpokenLanguage
    ] = await Promise.all([
      Country.countDocuments(),
      Country.findOne().sort('-area').select('name area'),
      Country.findOne().sort('population').select('name population'),
      this.getMostSpokenLanguage()
    ]);

    return {
      totalCountries,
      largestCountryByArea: largestByArea,
      smallestCountryByPopulation: smallestByPopulation,
      mostSpokenLanguage
    };
  }

  private async getMostSpokenLanguage(): Promise<any> {
    const result = await Country.aggregate([
      { $unwind: '$languages' },
      {
        $group: {
          _id: '$languages',
          totalSpeakers: { $sum: '$population' }
        }
      },
      { $sort: { totalSpeakers: -1 } },
      { $limit: 1 },
      {
        $project: {
          language: '$_id',
          totalSpeakers: 1,
          _id: 0
        }
      }
    ]);

    return result[0];
  }

}