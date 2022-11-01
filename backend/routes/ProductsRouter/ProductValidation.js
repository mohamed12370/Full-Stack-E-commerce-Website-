const joi = require('joi');

const AddNewProduct = {
  body: joi
    .object()
    .required()
    .keys({
      name: joi.string().required().min(2).max(100).messages({
        'any.required':
          'Please Enter Product Name, Name cannot exceed 100 characters',
        'string.empty': 'please Name cannot less than 2 characters',
        'string.base': 'name must be string',
      }),
      price: joi
        .number()
        .required()
        .messages({ 'any.required': 'please enter the price of product' }),
      description: joi.string().min(2).required(),
      ratings: joi.number(),
      image: joi.array().items(
        joi.object().required().keys({
          name: joi.string(),
          size: joi.number(),
          type: joi.string(),
        })
      ),
      category: joi
        .string()
        .required()
        .messages({ 'any.required': 'please enter category' }),
      seller: joi
        .string()
        .required()
        .messages({ 'any.required': 'please entre product seller' }),
      stock: joi
        .number()
        .required()
        .messages({ 'any.required': 'please entre product stock' }),
      numOfReviews: joi
        .number()
        .messages({ 'any.required': 'please entre product numOfReviews' }),
      reviews: joi.array().items(
        joi.object().keys({
          name: joi
            .string()
            .required()
            .messages({ 'any.required': 'please enter review_name' }),
          rating: joi
            .number()
            .required()
            .messages({ 'any.required': 'please enter review_rating' }),
          comment: joi
            .string()
            .required()
            .messages({ 'any.required': 'please enter review_comment' }),
        })
      ),
      createAt: joi.date(),
    }),
};

const GetOrDeleteProduct = {
  params: joi
    .object()
    .required()
    .keys({
      id: joi.string().min(24).max(24).required().messages({
        'string.base': 'id must be 24 char not more or less than',
        'string.min': 'length must be at least 24 characters long',
        'string.max': 'length must be less than or equal to 24 characters long',
      }),
    }),
};

const updateProductValidation = {
  body: joi
    .object()
    .required()
    .keys({
      name: joi.string().min(2).max(100),
      price: joi.number(),
      description: joi.string(),
      ratings: joi.number(),
      images: joi.array().items(
        joi.object().keys({
          public_id: joi.string(),
          url: joi.string(),
        })
      ),
      category: joi.string(),
      seller: joi.string(),
      stock: joi.number(),
      numOfReviews: joi.number(),
      reviews: joi.array().items(
        joi.object().keys({
          name: joi.string(),
          rating: joi.number(),
          comment: joi.string(),
        })
      ),
      createAt: joi.date(),
    }),
  params: joi
    .object()
    .required()
    .keys({
      id: joi.string().min(24).max(24).required().messages({
        'string.base': 'id must be 24 char not more or less than',
        'string.min': 'length must be at least 24 characters long',
        'string.max': 'length must be less than or equal to 24 characters long',
      }),
    }),
};

module.exports = { AddNewProduct, GetOrDeleteProduct, updateProductValidation };
