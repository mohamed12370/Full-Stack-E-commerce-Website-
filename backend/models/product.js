const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter Product Name'],
      trim: true,
      maxLength: [100, 'Product Name cannot exceed 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please Enter Product Price'],
      maxLength: [5, 'Product Name cannot exceed 5 characters'],
      default: 0.0,
    },
    description: {
      type: String,
      required: [true, 'Please Enter Product description'],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: [true, 'Please Select Category for this Product'],
      enum: {
        values: [
          'Electronics',
          'Cameras',
          'Laptops',
          'Accessories',
          'Headphones',
          'Food',
          'Books',
          'Clothes/Shoes',
          'Beauty/Health',
          'Sports',
          'Outdoor',
          'Home',
        ],
        message: 'Please Select correct Category for Product',
      },
    },
    seller: {
      type: String,
      required: [true, 'please entre product seller'],
    },
    stock: {
      type: Number,
      required: [true, 'please entre product stock'],
      maxLength: [5, 'product name cannot exceed 5 characters'],
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    baseUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
