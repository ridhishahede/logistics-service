// routers/brouter.js

const express = require('express');
const router = express.Router();
const randomize = require('random-number');
const db = require('../models');

router.post('/checkPhoneNumber', async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Check if the phone number exists in the database
    const [rows] = await db.execute('SELECT * FROM users WHERE phone_number = ?', [phoneNumber]);

    if (rows.length > 0) {
      // Generate a random 4-digit number
      const otp = randomize({ min: 1000, max: 9999, integer: true });

      // Send the OTP as an alert
      res.send({ success: true, otp });
    } else {
      res.send({ success: false, message: 'Please sign up with us to enjoy the service' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
