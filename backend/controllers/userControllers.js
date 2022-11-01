const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register A User   =>  /api/v1/register

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const findEmail = await userModel.findOne({ email });
    if (findEmail) {
      res.json({
        success: false,
        message: 'Email is useed try anthor',
      });
    } else {
      let user = new userModel({
        name,
        email,
        password,
      });
      user = await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JET_EXPIRES_TIME,
      });

      res
        .status(201)
        .cookie('token', token, {
          expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        })
        .json({ success: true, token, user });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from register method',
      error,
    });
  }
};

// Login user   =>  /api/v1/login

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findEmail = await userModel.findOne({ email }).select('+password');
    if (findEmail) {
      const comperPassword = await bcrypt.compare(password, findEmail.password);
      const token = jwt.sign({ id: findEmail._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JET_EXPIRES_TIME,
      });
      if (comperPassword) {
        const findEmail = await userModel
          .findOne({ email })
          .select('name role avatar');
        res
          .status(201)
          .cookie('token', token, {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          })
          .json({
            success: true,
            token,
            findEmail,
          });
      } else {
        res.status(401).json({
          success: false,
          message: 'in-valid your emil or password',
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: 'in-valid your emil or password',
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from login method',
      error,
    });
  }
};

// frogot password     =>    /api/v1/password/forgot

const forgotPassword = async (req, res) => {
  const { email, password, id } = req.body;
  try {
    if (email) {
      const user = await userModel.findOne({ email });
      if (user) {
        return res.status(200).json({
          success: true,
          id: user._id,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'user not found with this email',
        });
      }
    } else if (password && id) {
      const user = await userModel.findById(id);
      if (user) {
        const hashPassword = await bcrypt.hash(password, 8);
        const updatedUser = await userModel.findByIdAndUpdate(
          id,
          { password: hashPassword },
          { new: true }
        );
        return res.status(200).json({
          success: true,
          message: 'updated password',
          updatedUser,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'in-valid id',
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from forgot password method',
      error,
    });
  }
};

// profile user   => /api/v1/profile

const userProfile = async (req, res) => {
  const id = req.user._id;
  try {
    const user = await userModel.findById(id);
    res.status(200).json({
      success: true,
      message: 'user profile',
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from user profile method',
      error,
    });
  }
};

// update password   => /api/v1/password/update

const updatePassword = async (req, res) => {
  const { oldPassword } = req.body;
  const id = req.user._id;
  try {
    const user = await userModel.findById(id).select('+password');
    const comperPassword = await bcrypt.compare(oldPassword, user.password);
    if (comperPassword) {
      return res.status(200).json({
        success: true,
        message: 'the old password is correct',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'the old password is wrong',
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from update password user method',
      error,
    });
  }
};

// update password   => /api/v1/new/password/update

const updateNewPassword = async (req, res) => {
  const { newPassword, cPassword } = req.body;
  const id = req.user._id;
  if (newPassword && cPassword && newPassword === cPassword) {
    const hashPassword = await bcrypt.hash(newPassword, 8);
    const user = await userModel.findByIdAndUpdate(
      id,
      {
        password: hashPassword,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: 'update new paswword is ok',
    });
  } else {
    return res.status(400).json({
      success: false,
      message: 'new password must be match confirem password',
    });
  }
};

// update user profile    =>   /api/v1/update/profile

const updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const id = req.user._id;
  try {
    if (email) {
      const user = await userModel.findOne({ email });
      if (user) {
        return res.status(400).json({
          success: false,
          message: 'email is used',
        });
      } else {
        const user = await userModel
          .findByIdAndUpdate(id, { email }, { new: true })
          .select('name email avatar role createdAt');
      }
    }
    const user = await userModel
      .findByIdAndUpdate(id, { name }, { new: true })
      .select('name email avatar role createdAt');
    res.status(200).json({
      success: true,
      message: 'update profile',
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from update profile user method',
      error,
    });
  }
};

// update user profile image   =>   /api/v1/update/profile/img

const updateProfileImage = async (req, res) => {
  const id = req.user._id;
  try {
    if (req.imageError) {
      res.status(400).json({
        success: false,
        message: 'in-vaild image format',
      });
    } else {
      const imageUrl = `${req.protocol}://${req.headers.host}/${req.dest}/${req.file.filename}`;
      //const imageUrl = `/${req.dest}/${req.file.filename}`;
      const user = await userModel
        .findByIdAndUpdate(id, { avatar: imageUrl }, { new: true })
        .select('name email avatar role createdAt');
      res.status(200).json({
        success: true,
        message: 'done change profille img',
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from update user profile image method',
      err: error,
    });
  }
};

// Logout user  => /api/v1/logout

const logout = async (req, res) => {
  res
    .status(200)
    .cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: 'logout user',
    });
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  userProfile,
  updatePassword,
  updateNewPassword,
  updateProfile,
  updateProfileImage,
  logout,
};
