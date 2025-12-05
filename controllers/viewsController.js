const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  try {
    const tours = await Tour.find();
    res.status(200).render('overview', { title: 'All Tours', tours });
  } catch (err) {
    next(err);
  }

  // 2) Build template

  // 3) Render template using tour data from step 1
});

exports.getTour = (req, res) => {
  res.status(200).render('tour', { title: 'The Forest Hiker' });
};
