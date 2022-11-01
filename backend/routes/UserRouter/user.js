const router = require('express').Router();
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  userProfile,
  updatePassword,
  updateProfile,
  updateProfileImage,
  updateNewPassword,
} = require('../../controllers/userControllers');
const { authorizationUser } = require('../../middlewares/authorizationMethod');
const validationMethod = require('../../middlewares/ValidationMethod');
const {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  updateProfileValidation,
} = require('./UserValidation');

const upload = require('../../middlewares/multer');

router.post('/register', validationMethod(registerValidation), registerUser);

router.post('/login', validationMethod(loginValidation), loginUser);

router.get('/profile', authorizationUser, userProfile);

router.put('/password/update', authorizationUser, updatePassword);
router.put('/new/password/update', authorizationUser, updateNewPassword);

router.put(
  '/update/profile',
  authorizationUser,
  validationMethod(updateProfileValidation),
  updateProfile
);

router.put(
  '/update/profile/img',
  authorizationUser,
  upload(`users`).single('image'),
  updateProfileImage
);

router.post(
  '/password/forgot',
  validationMethod(forgotPasswordValidation),
  forgotPassword
);

router.get('/logout', logout);

module.exports = router;
