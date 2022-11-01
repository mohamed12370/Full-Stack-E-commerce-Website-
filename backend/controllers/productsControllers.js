const productModel = require('../models/product');
const path = require('path');
const fs = require('fs');

// create new product   => /api/v1/admin/product/new

const newProduct = async (req, res) => {
  try {
    const user = req.user._id;
    const { name, price, description, category, seller, stock } = req.body;
    const baseUrl = `${req.protocol}://${req.headers.host}`;
    const imageUrl = `/${req.dest}/${req.file.filename}`;
    //console.log(req.file.filename);
    const product = await productModel.create({
      name,
      price,
      description,
      category,
      seller,
      stock,
      image: imageUrl,
      user,
      baseUrl,
      fileName: req.file.filename,
    });
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from add new product method',
      error,
    });
  }
};

// get all products => /api/v1/products

const getProducts = async (req, res) => {
  const queryPage = parseInt(req.query.page) || 1;
  const sendenProduct = 4;
  const skip = sendenProduct * (queryPage - 1);
  const productCount = await productModel.countDocuments();

  const queryKey = req.query.key || '';
  const querType = req.query.category || '';
  const queryPrice = req.query.price ? req.query.price.split('to') : '';
  const queryReview = req.query.review ? req.query.review.split('to') : '';
  //console.log(queryPrice);

  try {
    const products = await productModel
      .find({
        name: { $regex: queryKey, $options: 'i' },
        category: { $regex: querType, $options: 'i' },
        price: {
          $lte: parseInt(queryPrice[1]) || 1000000,
          $gte: parseInt(queryPrice[0]) || 0,
        },
        ratings: {
          $lte: parseInt(queryReview[1]) || 5,
          $gte: parseInt(queryReview[0]) || 0,
        },
      })
      .limit(sendenProduct)
      .skip(skip);
    res.status(200).json({
      success: true,
      productCount,
      count: products.length,
      products,
      sendenProduct,
      queryPage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from get all products method',
      error,
    });
  }
};

// get single product details => /api/v1/product/:id

const getSingleProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'product not found',
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from get single product method',
      error,
    });
  }
};

// update product => /api/v1/admin/product/:id

const updateProduct = async (req, res) => {
  try {
    let product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'product not found',
      });
    }

    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from update product method',
      error,
    });
  }
};

// update product image   => /api/v1/admin/product/img/:id

const updateProductImg = async (req, res) => {
  try {
    const { id } = req.params;
    const baseUrl = `${req.protocol}://${req.headers.host}`;
    const imageUrl = `/${req.dest}/${req.file.filename}`;
    const find = await productModel.findById(id);
    //console.log(find);
    if (
      fs.existsSync(
        path.join(__dirname, `../uploads/products/${find.fileName}`)
      )
    ) {
      fs.rmSync(path.join(__dirname, `../uploads/products/${find.fileName}`), {
        force: true,
        recursive: true,
      });
    }

    const product = await productModel.findByIdAndUpdate(
      id,
      { baseUrl, image: imageUrl, fileName: req.file.filename },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: 'update product image',
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from update product image method',
      error,
    });
  }
};

// Delete product => /api/v1/admin/product/:id

const deleteProduct = async (req, res) => {
  try {
    let product = await productModel.findByIdAndDelete(req.params.id);
    if (
      fs.existsSync(
        path.join(__dirname, `../uploads/products/${req.query.fileName}`)
      )
    ) {
      fs.rmSync(
        path.join(__dirname, `../uploads/products/${req.query.fileName}`),
        {
          force: true,
          recursive: true,
        }
      );
    }
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'product not found',
      });
    }

    let products = await productModel.find({});
    res.status(200).json({
      success: true,
      message: 'product are deleted.',
      products,
      delProduct: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from delete product method',
      error,
    });
  }
};

// search method => /api/v1/product/search

const searchProduct = async (req, res) => {
  // const resPerPage = 4;
  // const currentPage = Number(req.query.page) || 1;
  // const skip = resPerPage * (currentPage - 1);
  // const productCount = await productModel.countDocuments();
  const queryKey = req.query.key || '';
  const querType = req.query.category || '';
  const queryPrice = req.query.price && req.query.price.split('to');
  //console.log(queryPrice);

  try {
    const product = await productModel
      .find({
        name: { $regex: queryKey, $options: 'i' },
        category: { $regex: querType, $options: 'i' },
        price: {
          $lte: parseInt(queryPrice[1]) || 1000000,
          $gte: parseInt(queryPrice[0]) || 0,
        },
      })
      .limit(resPerPage)
      .skip(skip);

    res.status(200).json({
      success: true,
      count: product.length,
      productCount,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from search product method',
      error,
    });
  }
};

module.exports = {
  newProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  updateProductImg,
  deleteProduct,
  searchProduct,
};
