const router = require('express').Router();

const {
  proccessPayment,
  sendStripeApi,
} = require('../controllers/paymentController');
const { authorizationUser } = require('../middlewares/authorizationMethod');

router.post('/payment', authorizationUser, proccessPayment);
router.get('/stripeapi', authorizationUser, sendStripeApi);

module.exports = router;
