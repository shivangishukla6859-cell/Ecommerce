import User from '../models/User.js';
import { AppError } from '../utils/errorHandler.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find()
    .select('-password -refreshToken')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await User.countDocuments();

  sendSuccess(res, 200, {
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password -refreshToken');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  sendSuccess(res, 200, { user });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, role } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;

  await user.save();

  sendSuccess(res, 200, {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  }, 'User updated successfully');
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  await user.deleteOne();

  sendSuccess(res, 200, null, 'User deleted successfully');
});
