# Train Tracking API
## Overview
This project involves the development of a real-time train tracking system for Sri Lanka Railways. The system utilizes IoT devices installed on train engines to transmit GPS data at one-minute intervals. This data is ingested by a RESTful API, which retains the information for 90 days, and is consumed by multiple client applications for various administrative and technical purposes.

## Key Features
* RESTful API: Developed using Node.js and ES6+, this API ingests real-time GPS data from trains and provides endpoints for client applications to retrieve and display this data.
* Single Page Application (SPA): A modern web application that retrieves and displays real-time location data of trains currently in transit.
* Data Persistence: Efficient data storage and retrieval mechanisms to handle large volumes of GPS data.
* Security: Implementation of secure API endpoints to ensure data integrity and authorized access.
* Scalability: Designed with scalability in mind to handle increasing amounts of data and user requests.


### API Endpoints

#### Train Endpoints
- **GET /trains**: List all trains.
- **GET /trains/{train_id}**: Retrieve information about a specific train.

#### Route Endpoints
- **GET /routes**: Retrieve information about all train routes.
- **GET /routes/{route_id}**: Retrieve information about a specific train route.

#### Location Endpoints
- **POST /locations**: Submit location data from IoT devices.
- **GET /locations/{train_id}**: Retrieve location data for a specific train.
- **GET /locations/latest**: Retrieve the latest location data for all trains.
- **GET /locations/{train_id}/latest**: Retrieve the latest location data for a specific train.
- **DELETE /locations/delete**: Delete GPS data older than 90 days.

