/* eslint-disable camelcase */
const Razorpay = require('razorpay');
const crypto = require('crypto');

const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const factory = require('../controllers/handlerFactory');
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

exports.verifyPayment = catchAsync(async (req, res, next) => {
  console.log('VERIFY PAYMENT HIT');

  console.log(req.body);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_TEST_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature !== razorpay_signature) {
    return next(new AppError('Payment Verification failed', 400));
  }

  const order = await razorpay.orders.fetch(razorpay_order_id);

  const existingBooking = await Booking.findOne({
    tour: order.notes.tourId,
    user: order.notes.userId,
  });

  if (!existingBooking) {
    await Booking.create({
      tour: order.notes.tourId,
      user: order.notes.userId,
      price: order.amount / 100,
      paid: true,
    });
  }
  res.status(200).json({
    status: 'success',
  });
});

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
