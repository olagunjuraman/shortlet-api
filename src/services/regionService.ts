import  Country  from '../models/country';

export class RegionService {
 
  public async getRegionsWithStats(): Promise<any[]> {
    const regions = await Country.aggregate([
      {
        $group: {
          _id: '$region',
          countries: { $push: { name: '$name', population: '$population' } },
          totalPopulation: { $sum: '$population' },
          avgPopulation: { $avg: '$population' },
          countryCount: { $sum: 1 }
        }
      },
      {
        $project: {
          region: '$_id',
          countries: 1,
          totalPopulation: 1,
          avgPopulation: 1,
          countryCount: 1,
          _id: 0
        }
      },
      { $sort: { region: 1 } }
    ]);

    return regions;
  }
}