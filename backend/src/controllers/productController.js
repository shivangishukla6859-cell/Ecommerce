import Product from '../models/Product.js';
import { AppError } from '../utils/errorHandler.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

// @desc    Get all products with pagination, search, and filters
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  // Build query
  const query = { isActive: true };

  // Category filter
  if (req.query.category) {
    query.category = req.query.category.toLowerCase();
  }

  // Search
  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }

  // Price range
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) {
      query.price.$gte = parseFloat(req.query.minPrice);
    }
    if (req.query.maxPrice) {
      query.price.$lte = parseFloat(req.query.maxPrice);
    }
  }

  const products = await Product.find(query)
    .sort(req.query.sortBy || '-createdAt')
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Product.countDocuments(query);

  sendSuccess(res, 200, {
    products,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  sendSuccess(res, 200, { product });
});

// @desc    Get all categories
// @route   GET /api/products/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category', { isActive: true });
  sendSuccess(res, 200, { categories });
});

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  sendSuccess(res, 201, { product }, 'Product created successfully');
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  sendSuccess(res, 200, { product }, 'Product updated successfully');
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Soft delete by setting isActive to false
  product.isActive = false;
  await product.save();

  sendSuccess(res, 200, null, 'Product deleted successfully');
});
