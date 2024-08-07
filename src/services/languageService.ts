import  Country, { ICountry }  from '../models/country';

export class LanguageService {

  public async getLanguagesWithStats(): Promise<any[]> {
    const languages = await Country.aggregate([
    { $unwind: '$languages' },
    {
    $group: {
    _id: '$languages',
    countries: { $push: '$name' },
    totalSpeakers: { $sum: '$population' }
    }
    },
    {
    $project: {
    language: '$_id',
    countries: 1,
    totalSpeakers: 1,
    countryCount: { $size: '$countries' },
    _id: 0
    }
    },
    { $sort: { totalSpeakers: -1 } }
    ]);

    return languages;
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