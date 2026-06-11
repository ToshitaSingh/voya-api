const express = require('express');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');
const router = express.Router();

router.use(authController.protect);

router.post('/create-order/:tourId', bookingController.createCheckoutOrder);
router.post('/verify-payment', bookingController.verifyPayment);

module.exports = router;
