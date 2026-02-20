import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrder,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/auth.js';
import { createOrderValidator } from '../validators/orderValidator.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router.post('/', createOrderValidator, validate, createOrder);
router.get('/myorders', getMyOrders);
router.get('/:id', getOrder);
router.put('/:id/pay', updateOrderToPaid);
router.put('/:id/deliver', authorize('admin'), updateOrderToDelivered);
router.get('/', authorize('admin'), getOrders);

export default router;
