import { OpenAPIV3 } from "openapi-types";

const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Countries API Documentation",
    version: "1.0.0",
    description: "This is the API documentation for the Countries Information Service.",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local server"
    },
    {
      url: "https://your-production-url.com/api",
      description: "Production server"
    }
  ],
  paths: {
    "/countries": {
      get: {
        summary: "Get a list of countries",
        parameters: [
          {
            name: "page",
            in: "query",
            schema: { type: "integer", default: 1 },
            description: "Page number for pagination"
          },
          {
            name: "limit",
            in: "query",
            schema: { type: "integer", default: 10 },
            description: "Number of items per page"
          },
          {
            name: "region",
            in: "query",
            schema: { type: "string" },
            description: "Filter countries by region"
          },
          {
            name: "populationMin",
            in: "query",
            schema: { type: "integer" },
            description: "Minimum population filter"
          },
          {
            name: "populationMax",
            in: "query",
            schema: { type: "integer" },
            description: "Maximum population filter"
          },
          {
            name: "sort",
            in: "query",
            schema: { type: "string" },
            description: "Sort field and order (e.g., 'name:asc' or 'population:desc')"
          }
        ],
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PaginatedCountriesResponse"
                }
              }
            }
          },
          400: {
            description: "Bad request"
          }
        }
      }
    },
    "/countries/{id}": {
      get: {
        summary: "Get details of a specific country",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CountryDetails"
                }
              }
            }
          },
          404: {
            description: "Country not found"
          }
        }
      }
    },
    "/regions": {
      get: {
        summary: "Get a list of regions with statistics",
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/RegionStats"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/languages": {
      get: {
        summary: "Get a list of languages with statistics",
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/LanguageStats"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/statistics": {
      get: {
        summary: "Get global statistics",
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GlobalStatistics"
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Country: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          officialName: { type: "string" },
          region: { type: "string" },
          subregion: { type: "string" },
          population: { type: "integer" },
          area: { type: "number" },
          capital: { type: "array", items: { type: "string" } },
          languages: { type: "array", items: { type: "string" } },
          currencies: {
            type: "array",
            items: {
              type: "object",
              properties: {
                code: { type: "string" },
                name: { type: "string" },
                symbol: { type: "string" }
              }
            }
          },
          flags: {
            type: "object",
            properties: {
              png: { type: "string" },
              svg: { type: "string" }
            }
          }
        }
      },
      CountryDetails: {
        allOf: [
          { $ref: "#/components/schemas/Country" },
          {
            type: "object",
            properties: {
              borders: { type: "array", items: { type: "string" } },
              borderingCountries: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    officialName: { type: "string" }
                  }
                }
              },
              latlng: { type: "array", items: { type: "number" } },
              timezones: { type: "array", items: { type: "string" } },
              altSpellings: { type: "array", items: { type: "string" } },
              tld: { type: "array", items: { type: "string" } }
            }
          }
        ]
      },
      PaginatedCountriesResponse: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: { $ref: "#/components/schemas/Country" }
          },
          total: { type: "integer" },
          page: { type: "integer" },
          limit: { type: "integer" },
          totalPages: { type: "integer" }
        }
      },
      RegionStats: {
        type: "object",
        properties: {
          region: { type: "string" },
          totalPopulation: { type: "integer" },
          avgPopulation: { type: "number" },
          countryCount: { type: "integer" },
          countries: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                population: { type: "integer" }
              }
            }
          }
        }
      },
      LanguageStats: {
        type: "object",
        properties: {
          language: { type: "string" },
          totalSpeakers: { type: "integer" },
          countries: { type: "array", items: { type: "string" } },
          countryCount: { type: "integer" }
        }
      },
      GlobalStatistics: {
        type: "object",
        properties: {
          totalCountries: { type: "integer" },
          largestCountryByArea: { $ref: "#/components/schemas/Country" },
          smallestCountryByPopulation: { $ref: "#/components/schemas/Country" },
          mostSpokenLanguage: {
            type: "object",
            properties: {
              language: { type: "string" },
              totalSpeakers: { type: "integer" }
            }
          }
        }
      }
    }
  }
};

export default swaggerDocument;