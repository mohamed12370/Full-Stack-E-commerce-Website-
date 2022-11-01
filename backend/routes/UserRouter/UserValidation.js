const joi = require('joi');

const registerValidation = {
  body: joi
    .object()
    .required()
    .keys({
      name: joi.string().min(2).max(30).required().messages({
        'string.empty': 'plz enter your name',
        'string.min': 'name must be at least 2 characters long',
        'string.max': 'name must be less than or equal to 30 characters long',
      }),
      email: joi.string().email().required().messages({
        'string.empty': 'plz enter your email',
        'string.email': 'plz enter valid email',
      }),
      password: joi
        .string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
        .required()
        .messages({
          'string.empty': 'plz enter your password',
          'string.pattern.base':
            'password must be 6 chaer at less and 30 char max',
        }),
      cpassword: joi.ref('password'),
    }),
};

const loginValidation = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi.string().email().required().messages({
        'string.empty': 'plz enter your email',
        'string.email': 'plz enter valid email',
      }),
      password: joi
        .string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
        .required()
        .messages({
          'string.empty': 'plz enter your password',
          'string.pattern.base':
            'password must be 6 chaer at less and 30 char max',
        }),
    }),
};

const forgotPasswordValidation = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi.string().email().messages({
        'string.empty': 'plz enter your email',
        'string.email': 'plz enter valid email',
      }),
      id: joi.string().min(24).max(24),
      password: joi
        .string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
        .messages({
          'string.empty': 'plz enter your password',
          'string.pattern.base':
            'password must be 6 chaer at less and 30 char max',
        }),
      cPassword: joi.ref('password'),
      id: joi.string().min(24).max(24),
    }),
};

const updateProfileValidation = {
  body: joi
    .object()
    .required()
    .keys({
      name: joi.string().min(2).max(30),
      email: joi.string().email(),
    }),
};

module.exports = {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  updateProfileValidation,
};
