const router = require('express').Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  updateProductImg,
} = require('../../controllers/productsControllers');
const {
  authorizationUser,
  authorizationRole,
} = require('../../middlewares/authorizationMethod');
const validationMethod = require('../../middlewares/ValidationMethod');
const {
  AddNewProduct,
  GetOrDeleteProduct,
  updateProductValidation,
} = require('./ProductValidation');

const upload = require('../../middlewares/productMulter');
const uploadProductUpdate = require('../../middlewares/updateMulter');

/////////////////////////////////////////////////////////////////////////////

router.route('/products').get(getProducts);

router.route('/product/search').get(searchProduct);

router
  .route('/product/:id')
  .get(validationMethod(GetOrDeleteProduct), getSingleProduct);

router.route('/admin/product/new').post(
  //validationMethod(AddNewProduct),
  authorizationUser,
  authorizationRole('admin'),
  upload('products').single('image'),
  newProduct
);

router
  .route('/admin/product/:id')
  .put(
    validationMethod(updateProductValidation),
    authorizationUser,
    authorizationRole('admin'),
    updateProduct
  );

router.route('/admin/product/img/:id').put(
  //validationMethod(updateProductValidation),
  authorizationUser,
  authorizationRole('admin'),
  uploadProductUpdate('products').single('image'),
  updateProductImg
);

router
  .route('/admin/product/:id')
  .delete(
    validationMethod(GetOrDeleteProduct),
    authorizationUser,
    authorizationRole('admin'),
    deleteProduct
  );

module.exports = router;
