const router = require('express').Router();

const {
  addProductReview,
  productReviews,
  deleteReview,
} = require('../../controllers/reviewControllers');
const { authorizationUser } = require('../../middlewares/authorizationMethod');
const validationMethod = require('../../middlewares/ValidationMethod');
const {
  createAndUpdateValisadtion,
  productReviewsValidation,
  deletereviewValidation,
} = require('./reviewValidatin');

router.post(
  '/review',
  validationMethod(createAndUpdateValisadtion),
  authorizationUser,
  addProductReview
);

router.get(
  '/reviews',
  validationMethod(productReviewsValidation),
  authorizationUser,
  productReviews
);

router.put(
  '/review',
  validationMethod(deletereviewValidation),
  authorizationUser,
  deleteReview
);

module.exports = router;
