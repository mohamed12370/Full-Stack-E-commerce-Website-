const joi = require('joi');

const oneUserValidation = {
    params: joi
        .object()
        .required()
        .keys({
            id: joi.string().min(24).max(24).required(),
        }),
};

const updateUserValidation = {
    params: joi
        .object()
        .required()
        .keys({
            id: joi.string().min(24).max(24).required(),
        }),
    body: joi
        .object()
        .required()
        .keys({
            name: joi.string().min(2).max(30),
            email: joi.string().email(),
            role: joi.string().min(4),
        }),
};

module.exports = {
    oneUserValidation,
    updateUserValidation,
};