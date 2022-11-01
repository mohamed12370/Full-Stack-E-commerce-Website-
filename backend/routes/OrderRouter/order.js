const router = require('express').Router();

const {
  addNewOrder,
  singleOrder,
  userOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} = require('../../controllers/orderControllers');
const {
  authorizationUser,
  authorizationRole,
} = require('../../middlewares/authorizationMethod');
const validationMethod = require('../../middlewares/ValidationMethod');
const {
  newOrderValidation,
  singleOrderValidation,
  updateOrderValidation,
  deleteOrderValidation,
} = require('./orderValidation');

router.post(
  '/order/new',
  validationMethod(newOrderValidation),
  authorizationUser,
  addNewOrder
);

router.get(
  '/order/:id',
  validationMethod(singleOrderValidation),
  authorizationUser,
  singleOrder
);

router.get('/orders/me', authorizationUser, userOrders);

router.get(
  '/admin/orders',
  authorizationUser,
  authorizationRole('admin'),
  allOrders
);

router.put(
  '/admin/order/:id',
  validationMethod(updateOrderValidation),
  authorizationUser,
  authorizationRole('admin'),
  updateOrder
);

router.delete(
  '/admin/order/:id',
  validationMethod(deleteOrderValidation),
  authorizationUser,
  authorizationRole('admin'),
  deleteOrder
);

module.exports = router;
