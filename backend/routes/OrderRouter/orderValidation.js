const joi = require('joi');

const newOrderValidation = {
  body: joi
    .object()
    .required()
    .keys({
      shippingInfo: joi.object().required().keys({
        address: joi.string().required(),
        city: joi.string().required(),
        phoneNo: joi.string().required(),
        postalCode: joi.string().required(),
        country: joi.string().required(),
      }),
      user: joi.string().min(24).max(24),
      orderItems: joi
        .array()
        .required()
        .items(
          joi
            .object()
            .required()
            .keys({
              name: joi.string().required(),
              count: joi.number().required(),
              image: joi.string().required(),
              price: joi.number().required(),
              stock: joi.number().required(),
              id: joi.string().min(24).max(24).required(),
            })
        ),
      paymentInfo: joi.object().keys({
        id: joi.string(),
        status: joi.string(),
      }),
      paidAt: joi.date(),
      itemsPrice: joi.number().required(),
      taxPrice: joi.number().required(),
      shippingPrice: joi.number().required(),
      totalPrice: joi.number().required(),
      orderStatus: joi.string(),
      deliverAt: joi.date(),
      createAt: joi.date(),
    }),
};

const singleOrderValidation = {
  params: joi
    .object()
    .required()
    .keys({
      id: joi.string().min(24).max(24).required(),
    }),
};

const updateOrderValidation = {
  body: joi.object().required().keys({
    status: joi.string().required(),
  }),
  params: joi
    .object()
    .required()
    .keys({
      id: joi.string().min(24).max(24).required(),
    }),
};

const deleteOrderValidation = {
  params: joi
    .object()
    .required()
    .keys({
      id: joi.string().min(24).max(24).required(),
    }),
};

module.exports = {
  newOrderValidation,
  singleOrderValidation,
  updateOrderValidation,
  deleteOrderValidation,
};
