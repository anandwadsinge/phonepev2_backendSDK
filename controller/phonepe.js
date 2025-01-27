const axios = require("axios");
const uniqid = require("uniqid");
const { getToken } = require("./auth");
const CallbackResponse = require("./callbackModel");

const payment = async (req, res) => {
    try {
        const { firstName, lastName, email, mobileNumber, amount } = req.body;
        const merchantOrderId = uniqid();
        const prefix = 'FlowId';
        const flowId = prefix + '_' + uniqid();
        const fullName = `${firstName} ${lastName}`;

        // Validate required parameters
        if (!firstName || !lastName || !email || !mobileNumber) {
            return res.status(400).json({
                error: "Missing required parameters: firstName, lastName, email, or mobileNumber."
            });
        }

        // Prepare request data
        const requestData = {
            merchantOrderId,
            amount: amount * 100,
            expireAfter: 320,
            metaInfo: {
                flowId,
                fullName,
                mobileNumber,
                email,
            },
            paymentFlow: {
                type: "PG_CHECKOUT",
                paymentModeConfig: {
                    enabledPaymentModes: [
                        { type: "UPI_INTENT" },
                        { type: "UPI_COLLECT" },
                        { type: "UPI_QR" },
                        { type: "NET_BANKING" },
                        {
                            type: "CARD",
                            cardTypes: ["DEBIT_CARD", "CREDIT_CARD"],
                        },
                    ],
                },
            },
        };

        // Check if the token is available
        const URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/sdk/order";
        const token = getToken();

        if (!token) {
            return res.status(500).json({
                error: "OAuth token not available. Please try again later.",
            });
        }

        // Set up API request options
        const options = {
            method: "POST",
            url: URL,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `O-Bearer ${token}`,
            },
            data: requestData,
        };

        // Perform the API request
        const response = await axios(options);

        // Extract orderId and token from the response
        const { orderId, token: orderToken } = response.data;

        // Send the extracted data to the frontend
        res.status(200).json({
            success: true,
            message: "Success",
            merchantId: 'TESTUAT',
            flowId: flowId,
            data: {
                orderId,
                token: orderToken,
            },
        });
    } catch (error) {
        // Capture and send the error
        res.status(500).json({
            success: false,
            message: "Processing failed.",
            error: error.message,
        });
    }
};

const callback = async (req, res) => {
    const data = req.body;
 
    try {
        if (!data.event || !data.payload) {
            console.error("Invalid data format", error);
            return res.status(400).send({
                message: "Invalid data format. 'event' and 'payload' are required.",
            });
        }

        const callbackResponse = new CallbackResponse({
            event: data.event,
            payload: data.payload,
        });

        await callbackResponse.save();

        // console.log("Data saved to database:", callbackResponse);
        res.status(200).send({ message: "Callback data saved successfully" });
    } catch (error) {
        console.error("Error saving callback data:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};

module.exports = {
    payment,
    callback
};
