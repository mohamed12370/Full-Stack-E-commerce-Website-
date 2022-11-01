const stripe = require('stripe')(process.env.stripe_secret_key);

// process stripe payment  =>  /api/v1/payment

const proccessPayment = async (req, res) => {
  const paymentIntent = await stripe.paymentIntent.create({
    amount: req.body.amount,
    currency: 'usd',
    metadata: { integration_check: 'accept_a_payment' },
  });
  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
};

// send stripe api key  =>  /api/v1/stripeapi

const sendStripeApi = async (req, res) => {
  res.status(200).json({
    success: true,
    srtipeApiKey: process.env.stripe_api_key,
  });
};

module.exports = proccessPayment;

module.exports = { proccessPayment, sendStripeApi };
