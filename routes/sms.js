const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

const accountSid = 'AC0e3462de7387e64b2eafb58d283bb79e';
const authToken = '223376e7bde2aa8d45c869841aa1e7c0';

const client = require('twilio')(accountSid, authToken);

router.post('/envio/sms', async (req, re) => {
    client.messages
      .create({
        body: 'Hello from twilio-node',
        to: '+51968169584', // Text your number
        from: '+51968169584', // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));
})

module.exports = router