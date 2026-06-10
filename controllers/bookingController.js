const Razorpay = require('razorpay');
// const crypto = require('crypto');

const Tour = require('../models/tourModel');
// const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_TEST_API_KEY,
  key_secret: process.env.RAZORPAY_TEST_KEY_SECRET,
});

exports.createCheckoutOrder = catchAsync(async (req, res, next) => {
  try {
    // 1) Get currently booked tour
    const tour = await Tour.findById(req.params.tourId);

    if (!tour) {
      return next(new AppError('No tour found', 404));
    }
    // 2) Create Order
    const options = {
      amount: tour.price * 100,
      currency: 'INR',
      receipt: `tour-${tour.id}`,
      notes: {
        tourId: tour.id,
        userId: req.user.id,
      },
    };

    const order = await razorpay.orders.create(options);

    // 3) Send to client
    res.status(200).json({
      status: 'success',
      order,
      razorpayKey: process.env.RAZORPAY_TEST_API_KEY,
    });
  } catch (err) {
    return res.status(400).send(`Error: ${err.message}`);
  }
});
