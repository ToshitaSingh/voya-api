const express = require('express');

const router = express.Router();
const viewController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

router.use(authController.isLoggedIn);

router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);
router.get('/test-programming-error', viewController.testProgrammingError);

router.get('/login', viewController.getLoginForm);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/my-tours', authController.protect, viewController.getMyTours);

router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData,
);

module.exports = router;
