const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require("./serviceAccountKey.json");

const express = require('express');
const app = express();

// Body parser for JSON data
app.use(express.json());

// cross origin
const cors = require('cors');
app.use(cors({ origin: true }));
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

// firebase credential
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// api endpoint
app.get('/', (req, res) => {
    return res.send('hello world');
});

// user
const userRoute = require('./routes/user');
app.use('/api/users', userRoute);

exports.app = functions.https.onRequest(app);