# PhonePe V2 Server-Side SDK Integration

This repository provides the backend implementation for integrating PhonePe V2 SDKs using Node.js. It handles the server-side logic for payment flows.

## Features

- Implemented the Fetch Auth Token API (Authorization) to authorize subsequent API calls.
- Once authenticated using the Auth Token, the payment initiation process is triggered.
- Implemented the callback mechanism to handle the S2S (Server-to-Server) response, which is stored in backend for further processing.

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

