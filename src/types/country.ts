
export interface Country {
    name: {
      common: string;
      official: string;
    };
    region: string;
    population: number;
    area: number;
    borders: string[];
    languages: Record<string, string>;
    [key: string]: any; 
  }
  