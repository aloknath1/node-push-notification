const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
//middleware
//Set static path
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

//web-push generate-vapid-keys 
const publicVapidKey = 'BIO4gfW0Cv3o7_CCsEbFsWHq4vwZ1ls5DPXrlTvMm9pppRp_jPG8CdMe3KA61H-X-LkT8GR0vNdYANp73xIBxWc';
const privateVapidKey = 'BpIsl6pnwfGYquDE0xSJQwVWpHIjab7TWfkpW9Na210';

webpush.setVapidDetails('mailto:alok.nath@bold.com', publicVapidKey, privateVapidKey);

//Subscribe Route
app.post('/subscribe', (req, res) => {
    //Get Push Subscription Object
    const subscription = req.body;

    //Send 201 - resource created
    res.status(201).json({});

    //create payload
    const payload = JSON.stringify({ title: 'Push Test'});

    //pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err => console.error(err) );
            
});


const port = 5000;
app.listen(port, () => console.log(`Server started at port ${port}`));