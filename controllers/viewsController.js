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

exports.getTour = catchAsync(async (req, res) => {
  // 1)Get the data for the requested tour (including reviews and tour guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  // 2) Build template

  // 3) Render template using data from step 1
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
    includeMapbox: true,
    user: req.user || null,
  });
});
