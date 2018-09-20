const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = require('./constants');

const app = express();

//Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

/***
 * VAPID KEYS
 * Voluntary Application Server Identification (VAPID) for Web Push
 * ******************************
 * GENERATE VAPID KEYS**********
 * go to web push folder and type 'generate-vapid-keys'
 * e.g ====  ./node_modules/.bin/web-push generate-vapid-keys
 * will generate public and private keys
 * add a constats file in root directory and add constants PUBLIC_VAPID_KEYS & PRIVATE_VAPID_KEYS
 */

const publicVapidKey = PUBLIC_VAPID_KEY;
const privateVapidkeys = PRIVATE_VAPID_KEY;

webpush.setVapidDetails('mailto: test@test.com', publicVapidKey, privateVapidkeys);

//Subscribe route
app.post('/subscribe', (req, res) => {

    const subscription = req.body;
    res.status(201).json({}) // resource created status code 201
    const payload = JSON.stringify({ title: 'Push Notification Test.' }); //create payload
    // pass object in send notification
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
})

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));