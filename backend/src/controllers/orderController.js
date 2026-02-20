import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import { AppError } from '../utils/errorHandler.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (!orderItems || orderItems.length === 0) {
    throw new AppError('No order items', 400);
  }

  // Calculate prices
  let itemsPrice = 0;
  const items = [];

  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product || !product.isActive) {
      throw new AppError(`Product ${item.product} not found`, 404);
    }

    if (product.stock < item.quantity) {
      throw new AppError(`Insufficient stock for ${product.name}`, 400);
    }

    const itemPrice = product.price * item.quantity;
    itemsPrice += itemPrice;

    items.push({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: item.quantity
    });

    // Update stock
    product.stock -= item.quantity;
    await product.save();
  }

  const taxPrice = itemsPrice * 0.1; // 10% tax
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  // Create order
  const order = await Order.create({
    user: req.user.id,
    orderItems: items,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  });

  // Clear cart
  const cart = await Cart.findOne({ user: req.user.id });
  if (cart) {
    cart.items = [];
    await cart.save();
  }

  await order.populate('user', 'name email');
  await order.populate('orderItems.product');

  sendSuccess(res, 201, { order }, 'Order created successfully');
});

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id })
    .sort('-createdAt')
    .populate('orderItems.product', 'name image');

  sendSuccess(res, 200, { orders });
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate('orderItems.product');

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Make sure user owns the order or is admin
  if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new AppError('Not authorized to access this order', 403);
  }

  sendSuccess(res, 200, { order });
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const orders = await Order.find()
    .populate('user', 'name email')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Order.countDocuments();

  sendSuccess(res, 200, {
    orders,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id || 'mock_payment_id',
    status: 'completed',
    update_time: new Date().toISOString(),
    email_address: req.user.email
  };

  await order.save();

  sendSuccess(res, 200, { order }, 'Order updated to paid');
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();
  await order.save();

  sendSuccess(res, 200, { order }, 'Order updated to delivered');
});
