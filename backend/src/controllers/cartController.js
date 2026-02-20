import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { AppError } from '../utils/errorHandler.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }

  sendSuccess(res, 200, { cart });
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  // Validate product exists and has stock
  const product = await Product.findById(productId);
  if (!product || !product.isActive) {
    throw new AppError('Product not found', 404);
  }

  if (product.stock < quantity) {
    throw new AppError(`Only ${product.stock} items available in stock`, 400);
  }

  // Get or create cart
  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }

  // Check if product already in cart
  const itemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    // Update quantity
    const newQuantity = cart.items[itemIndex].quantity + quantity;
    if (product.stock < newQuantity) {
      throw new AppError(`Only ${product.stock} items available in stock`, 400);
    }
    cart.items[itemIndex].quantity = newQuantity;
  } else {
    // Add new item
    cart.items.push({
      product: productId,
      quantity,
      price: product.price
    });
  }

  await cart.save();
  await cart.populate('items.product');

  sendSuccess(res, 200, { cart }, 'Item added to cart');
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const { itemId } = req.params;

  if (quantity < 1) {
    throw new AppError('Quantity must be at least 1', 400);
  }

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  const item = cart.items.id(itemId);
  if (!item) {
    throw new AppError('Cart item not found', 404);
  }

  // Check stock
  const product = await Product.findById(item.product);
  if (!product || product.stock < quantity) {
    throw new AppError(`Only ${product.stock} items available in stock`, 400);
  }

  item.quantity = quantity;
  await cart.save();
  await cart.populate('items.product');

  sendSuccess(res, 200, { cart }, 'Cart updated');
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
export const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  cart.items.id(req.params.itemId).remove();
  await cart.save();
  await cart.populate('items.product');

  sendSuccess(res, 200, { cart }, 'Item removed from cart');
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  cart.items = [];
  await cart.save();

  sendSuccess(res, 200, { cart }, 'Cart cleared');
});
