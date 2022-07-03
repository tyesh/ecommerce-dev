import express from 'express';
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthor,
  getAuthorById,
  updateAuthor,
} from '../controllers/authorController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/all').get(getAllAuthors);
router.route('/').post(protect, admin, createAuthor).get(getAuthor);
router
  .route('/:id')
  .get(getAuthorById)
  .put(protect, admin, updateAuthor)
  .delete(protect, admin, deleteAuthor);

export default router;
