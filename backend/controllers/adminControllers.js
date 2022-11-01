const productModel = require('../models/product');
const userModel = require('../models/user');
const fs = require('fs');
const path = require('path');

// admin get all users    =>    /api/v1/admin/users

const allUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({
      success: true,
      message: 'all users',
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from admin all users method',
      error,
    });
  }
};

// get user details   =>   /api/v1/admin/user/:id

const userDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'in-valid id',
      });
    }
    res.status(200).json({
      success: true,
      message: 'user details',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        'catch error from admin get user details method may be you want to check id',
      error,
    });
  }
};

// update user by admin    =>   /api/v1/admin/user/:id

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const user = await userModel.findById(id);
    if (user) {
      const user = await userModel.findByIdAndUpdate(
        id,
        { name, email, role },
        {
          new: true,
        }
      );
      const users = await userModel.find({});
      return res.status(200).json({
        success: true,
        message: 'update user',
        user,
        users,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'in-valid id',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        'catch error from admin update user details method may be you want to check id',
      error,
    });
  }
};

// delete user by admin   => /api/v1/admin/user/:id

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'in-valid id',
      });
    }
    const delUser = await userModel.findByIdAndDelete(id);
    const users = await userModel.find({});
    if (fs.existsSync(path.join(__dirname, `../uploads/users/${id}`))) {
      fs.rmSync(path.join(__dirname, `../uploads/users/${id}`), {
        force: true,
        recursive: true,
      });
    }
    res.status(200).json({
      success: true,
      message: 'delete user',
      delUser,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        'catch error from admin delete user method may be you want to check id',
      error,
    });
  }
};

// Products Controllers For Admin

// get all products  => /api/v1/admin/products

const adminProducts = async (req, res) => {
  const role = req.user.role;
  try {
    if (role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'admin only',
      });
    }

    const products = await productModel.find({});
    res.status(200).json({
      success: true,
      message: 'all products',
      products,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'catch error from get all prodcuts for admin method',
      error,
    });
  }
};

module.exports = {
  allUsers,
  userDetails,
  updateUser,
  deleteUser,

  adminProducts,
};
