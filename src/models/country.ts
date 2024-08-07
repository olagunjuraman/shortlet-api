import mongoose, { Schema, Document } from 'mongoose';

export interface ICountry extends Document {
  name: string;
  officialName: string;
  region: string;
  subregion: string;
  population: number;
  area: number;
  capital: string[];
  languages: string[];
  borders: string[];
  cca3: { type: String},

  altSpellings?: string[];  
  tld?: string[];
  // demonyms?: { [key: string]: { f: string; m: string } };

  translations: {
    [key: string]: {
      official: string;
      common: string;
    };
  },

  demonyms?: Demonyms;
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  flags: {
    png: string;
    svg: string;
  };
  latlng: number[];
  timezones: string[];
}


interface Demonyms {
  [key: string]: { f: string; m: string };
}

const CountrySchema: Schema = new Schema({
  name: { type: String, required: true, index: true },
  officialName: { type: String, required: true },
  region: { type: String, required: true, index: true },
  subregion: { type: String },
  population: { type: Number, required: true, index: true },
  area: { type: Number },
  capital: [String],
  languages: [String],
  borders: [String],
  cca3: { type: String, index: true },
  currencies: [{
    code: String,
    name: String,
    symbol: String
  }],
  flags: {
    png: String,
    svg: String
  },

  altSpellings: [String],

  demonyms: {
    type: Map,
    of: {
    f: String,
    m: String
    }
    },

    tld: [String],

  translations: {
    type: Map,
    of: {
      official: String,
      common: String
    }
  },
  latlng: [Number],
  timezones: [String]
}, { timestamps: true });


CountrySchema.index({ population: 1 });
CountrySchema.index({ area: 1 });
CountrySchema.index({ 'languages': 1 });


CountrySchema.path('latlng').validate(function(value: number[]) {
    return value.length === 2 && 
           value[0] >= -90 && value[0] <= 90 && 
           value[1] >= -180 && value[1] <= 180;
  }, 'Invalid latitude or longitude');

export default mongoose.model<ICountry>('Country', CountrySchema);