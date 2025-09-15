// routes/adminRoutes.js
import express from 'express';
import { getAllOrders, deleteProduct, updateProduct } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Orders management
router.get('/orders', protect, admin, getAllOrders);

// Product management
router.delete('/products/:id', protect, admin, deleteProduct);
router.put('/products/:id', protect, admin, updateProduct);

export default router;
