const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// import all routes
const products = require('./routes/ProductsRouter/product');
const review = require('./routes/ReviewRouter/review');
const user = require('./routes/UserRouter/user');
const admin = require('./routes/AdminRouter/adminRouter');
const order = require('./routes/OrderRouter/order');
const payment = require('./routes/Payment');

//const { urlencoded } = require('body-parser');

app.use('/api/v1', products);
app.use('/api/v1', review);
app.use('/api/v1', user);
app.use('/api/v1', admin);
app.use('/api/v1', order);
app.use('/api/v1', payment);

app.use('/uploads', express.static(path.join(__dirname, './uploads')));

if (process.env.MODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../front/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front/build/index.html'));
  });
} else {
  app.use(express.static(path.join(__dirname, '../front/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front/build/index.html'));
  });
}

module.exports = app;
