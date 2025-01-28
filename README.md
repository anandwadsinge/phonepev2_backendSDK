# PhonePe V2 Backend SDK

This repository contains the backend implementation for the PhonePe V2 integration using Node.js and Express.js. The backend is responsible for handling the payment flow and providing APIs for initiating standard payments.

## Features

- Built with Node.js and Express.js.
- Integration with PhonePe payment gateway.
- Support for standard payment flows.
- Secure and lightweight backend service.

## Prerequisites

Before running the application, ensure you have the following:

- [Node.js](https://nodejs.org/) installed (v14 or later recommended).
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for managing dependencies.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anandwadsinge/phonepev2_backendSDK.git
   cd phonepev2_backendSDK

Install dependencies:
    
    npm install

Create a .env file in the root directory and add the required environment variables:

    PORT=3000
    MONGO_URI=<your-mongo-database-uri>
    CLIENT_ID=<your-client-id>
    CLIENT_SECRET=<your-client-secret>
    CLIENT_VERSION=<your-client-version>
    GRANT_TYPE=<your-merchant-id>
    CALLBACKURL=<your-callbackUrl>

Running the Application
To start the backend server, use the following command:

    npm start

The server will start on the specified PORT or the default port 3000.

## Testing the API
### Standard Payment API
You can test the standardPayment API using the below cURL command:


    curl --location 'https://phonepev2-backend-sdk.vercel.app/api/standardPayment' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "firstName": "Anand",
    "lastName": "Wadsinge",
    "email": "test@example.com",
    "mobileNumber": 9999988888,
    "amount": 1
    }'
### Response
A successful request will return a response like:

    {
    "success": true,
    "message": "Success",
    "merchantId": "<your-merchant-id>",
    "flowId": "FlowId_11ete3m6duvbfh",
    "data": {
        "orderId": "OMO2501262220148679958162",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
    }
### Deployment
This backend is deployed on Vercel.

### Endpoint
Base URL: https://phonepev2-backend-sdk.vercel.app

### Contributing
Contributions are welcome! Please create a pull request with your proposed changes.

