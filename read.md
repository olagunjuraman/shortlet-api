# REST Countries API Integration

This project is a REST API built using TypeScript and Node.js that integrates data from the REST Countries API. It provides various endpoints for retrieving and analyzing country data.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Implementation Approach](#implementation-approach)
- [Challenges and Solutions](#challenges-and-solutions)
- [Future Improvements](#future-improvements)

## Features

- Fetch and process data from the REST Countries API
- Endpoints for retrieving country information, regional data, language statistics, and more
- Data filtering, searching, and sorting capabilities
- Caching strategies for improved performance
- Security measures against common web vulnerabilities
- Comprehensive logging system
- Unit and integration tests

## Tech Stack

- Node.js
- TypeScript
- Express.js
- MongoDB (for data storage)
- Redis (for caching)
- Jest (for testing)
- Swagger (for API documentation)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB
- Redis

### Installation

1. Clone the repository:

2. Navigate to the project directory:
cd rest-countries-api

3. Install dependencies:
npm install

4. Set up environment variables:
- Create a `.env` file in the root directory
- Add the following variables:
  ```
  PORT=3000
  MONGODB_URI=your_mongodb_connection_string
  REDIS_URL=your_redis_url
  ```

5. Start the server:
npm run start

The API should now be running on `http://localhost:3000`.

## API Documentation

API documentation is available via Swagger UI. After starting the server, visit:
http://localhost:3000/api-docs

This interactive documentation provides details on all available endpoints, request/response formats, and allows you to test the API directly from the browser.

## Testing

To run the test suite:
npm run test
This will execute both unit and integration tests.




## Implementation Approach

1. **Data Fetching and Storage**: We use a scheduled job to fetch data from the REST Countries API and store it in MongoDB. This allows us to have a local copy of the data for faster access and to perform complex queries.

2. **Caching**: Redis is used to cache frequently accessed data and API responses, significantly improving response times for repeated queries.

3. **API Design**: The API follows RESTful principles, with clear and consistent endpoint naming. We use query parameters for filtering and pagination to keep the API flexible and easy to use.

4. **Security**: We've implemented rate limiting, input validation, and proper error handling to secure the API against common vulnerabilities.

5. **Performance Optimization**: Besides caching, we've optimized database queries and implemented efficient data processing algorithms to handle large datasets smoothly.

## Challenges and Solutions

1. **Data Consistency**: Handling inconsistencies in the original API data was challenging. i implemented a data normalization process during the ingestion phase to ensure consistent data structure.

2. **Efficient Language Statistics**: Calculating global language statistics was computationally intensive. i solved this by pre-computing these statistics during data ingestion and storing the results for quick retrieval.


## Future Improvements

Given more time, i would consider the following enhancements:

1. Implement GraphQL alongside REST for more flexible data querying
2. Add more advanced analytics endpoints (e.g., economic indicators, historical data analysis)
3. Improve test coverage and add performance benchmarking tests
5. Add user authentication and personalized data views

i welcome contributions and feedback to make this API even better!