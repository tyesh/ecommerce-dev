import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  CreateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
const router = express.Router();
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, CreateProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
