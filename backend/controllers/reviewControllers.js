const productModel = require('../models/product');

// create new review   => /api/v1/review

const addProductReview = async (req, res) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  try {
    let product = await productModel.findById(productId);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'in-valid id',
      });
    }

    const isReveiewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (isReveiewed) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    product = await productModel.findByIdAndUpdate(productId, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: 'added new review',
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from create and update review method',
      error,
    });
  }
};

// get product reviews    => /api/v1/reviews

const productReviews = async (req, res) => {
  const { id } = req.query;
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'in-valid id',
      });
    }
    res.status(200).json({
      success: true,
      message: 'reviews for this product',
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from get product reviews method',
      error,
    });
  }
};

// delete product review   => /api/v1/revirws

const deleteReview = async (req, res) => {
  const { productId, reviewId } = req.body;
  try {
    let product = await productModel.findById(productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'in-valid id',
      });
    }

    product.reviews = product.reviews.filter(
      (el) => el._id.toString() !== reviewId.toString()
    );

    product.numOfReviews = product.reviews.length;

    const ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    product.ratings = ratings || 0;

    product = await productModel.findByIdAndUpdate(productId, product, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: 'delete review',
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from delete product reviews method',
      error,
    });
  }
};

module.exports = {
  addProductReview,
  productReviews,
  deleteReview,
};
