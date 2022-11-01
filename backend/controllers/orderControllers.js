const orderModel = require('../models/order');
const productModel = require('../models/product');

// create new order   =>  /api/v1/oder/new

const addNewOrder = async (req, res) => {
  //console.log(req.body);
  const {
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  try {
    const order = await orderModel.insertMany({
      shippingInfo,
      orderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: 'added new order',
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from add new order method ',
      error,
    });
  }
};

// get single order     =>   /api/v1/order/:id

const singleOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await orderModel.findById(id).populate('user', 'name email');
    if (!order) {
      return res.status(400).json({
        success: false,
        message: 'in-valid id',
      });
    }
    res.status(200).json({
      success: true,
      message: 'your order',
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from get single order method may be id',
      error,
    });
  }
};

// get logged in user order    =>   /api/v1/orders/me
const userOrders = async (req, res) => {
  const { _id } = req.user;
  try {
    const order = await orderModel.find({ user: _id });
    res.status(200).json({
      success: true,
      message: 'user order',
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from get logged in user orders method',
      error,
    });
  }
};

// get all orders by admin   =>  /api/v1/admin/orders

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    let totalAmount = 0;
    orders.forEach((order) => (totalAmount += order.totalPrice));

    res.status(200).json({
      success: true,
      message: 'all orders',
      totalAmount,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from get all orders method',
      error,
    });
  }
};

// update after complet payment order   =>  /api/v1/admin/order/:id

const updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await orderModel.findById(id);

    if (order.orderStatus === 'Delivered') {
      return res.status(404).json({
        success: false,
        message: 'you have already delivered this order',
      });
    } else if (order == null || order == undefined) {
      return res.status(400).json({
        success: false,
        message: 'in-valid id',
      });
    }

    const updatedProduct = order.orderItems.map(async (item) => {
      let product = await productModel.findById(item.id);
      const changeStock = product.stock - item.count;
      product = await productModel.findByIdAndUpdate(
        item.id,
        { stock: changeStock },
        { new: true }
      );
      return product;
    });
    //console.log(updatedProduct);
    if (!updatedProduct || updatedProduct === undefined) {
      return res.status(400).json({
        success: false,
        message: 'product in this order not found',
      });
    }

    const upOrder = await orderModel.findByIdAndUpdate(
      id,
      { orderStatus: req.body.status, deliverAt: Date.now() },
      { new: true }
    );

    const orders = await orderModel.find({});

    let totalAmount = 0;
    orders.forEach((order) => (totalAmount += order.totalPrice));

    res.status(200).json({
      success: true,
      message: 'update order',
      upOrder,
      orders,
      totalAmount,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from update order method',
      error,
    });
  }
};

// delete order   =>  /api/v1/admin/order/:id

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    let order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'in-valid id',
      });
    }
    order = await orderModel.findByIdAndDelete(id);

    const orders = await orderModel.find({});
    let totalAmount = 0;
    orders.forEach((order) => (totalAmount += order.totalPrice));

    res.status(200).json({
      success: true,
      message: 'deleted order',
      orders,
      totalAmount,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from delete order method',
      error,
    });
  }
};

module.exports = {
  addNewOrder,
  singleOrder,
  userOrders,
  allOrders,
  updateOrder,
  deleteOrder,
};
