/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
{/* eslint-disable max-len */}
const stripe = require("stripe")("sk_test_51NZ6BtDihPaRmewyBHqj7I6NGUzz9GtrPoCYUrPAiz3dF0ME5Zt3IwBuFsVMZ6W7onc2pFebblGvLtlxewLlzU8M00ED1bqShc");
{/* eslint-enable max-len */}


// API

// - App config
const app = express();

// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
    response.header( "Access-Control-Allow-Origin" );
    const total = request.query.total;
    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
  currency: "usd",
  metadata: {integration_check: "accept_a_payment"},
  description: "Software development services",
  automatic_payment_methods: {
    enabled: true,
  },
    });
  
    // OK - Created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  });

// - Listen command
exports.api = functions.https.onRequest(app);
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
