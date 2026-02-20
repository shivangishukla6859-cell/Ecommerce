import express from 'express';
import {
  getProducts,
  getProduct,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';
import {
  createProductValidator,
  updateProductValidator
} from '../validators/productValidator.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:id', getProduct);
router.post('/', protect, authorize('admin'), createProductValidator, validate, createProduct);
router.put('/:id', protect, authorize('admin'), updateProductValidator, validate, updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

export default router;
