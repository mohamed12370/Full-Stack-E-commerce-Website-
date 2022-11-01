const joi = require('joi');

const createAndUpdateValisadtion = {
  body: joi
    .object()
    .required()
    .keys({
      productId: joi.string().min(24).max(24).required(),
      comment: joi.string().min(2).max(500).required(),
      rating: joi.number().min(0).max(5).required(),
    }),
};

const productReviewsValidation = {
  query: joi
    .object()
    .required()
    .keys({
      id: joi.string().min(24).max(24).required(),
    }),
};

const deletereviewValidation = {
  body: joi
    .object()
    .required()
    .keys({
      productId: joi.string().min(24).max(24).required(),
      reviewId: joi.string().min(24).max(24).required(),
    }),
};

module.exports = {
  createAndUpdateValisadtion,
  productReviewsValidation,
  deletereviewValidation,
};
