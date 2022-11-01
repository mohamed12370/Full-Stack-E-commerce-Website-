const router = require('express').Router();

const {
  allUsers,
  userDetails,
  updateUser,
  deleteUser,
  adminProducts,
} = require('../../controllers/adminControllers');
const {
  authorizationUser,
  authorizationRole,
} = require('../../middlewares/authorizationMethod');
const validationMethod = require('../../middlewares/ValidationMethod');
const {
  oneUserValidation,
  updateUserValidation,
} = require('./adminValidation');

router.get(
  '/admin/users',
  authorizationUser,
  authorizationRole('admin'),
  allUsers
);

router.get(
  '/admin/user/:id',
  validationMethod(oneUserValidation),
  authorizationUser,
  authorizationRole('admin'),
  userDetails
);

router.put(
  '/admin/user/:id',
  validationMethod(updateUserValidation),
  authorizationUser,
  authorizationRole('admin'),
  updateUser
);

router.delete(
  '/admin/user/:id',
  validationMethod(oneUserValidation),
  authorizationUser,
  authorizationRole('admin'),
  deleteUser
);

router.get(
  '/admin/prodcuts',
  authorizationUser,
  authorizationRole('admin'),
  adminProducts
);

module.exports = router;
