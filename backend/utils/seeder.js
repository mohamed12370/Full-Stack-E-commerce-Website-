const productModel = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');
const products = require('../data/product.json');

// setting dotenv file
dotenv.config({ path: 'backend/config/config.env' });
connectDatabase();

const seedProduct = async(req, res) => {
    try {
        await productModel.deleteMany();
        console.log('products are deleted');
        await productModel.insertMany(products);
        console.log('all products are added.');
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};

seedProduct();