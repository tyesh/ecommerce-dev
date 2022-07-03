import express from 'express';
import {
  createGenre,
  deleteGenre,
  getAllGenres,
  getGenreById,
  getGenres,
  updateGenre,
} from '../controllers/genreController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(protect, admin, createGenre).get(getGenres);
router.route('/all').get(getAllGenres);
router
  .route('/:id')
  .get(getGenreById)
  .put(protect, admin, updateGenre)
  .delete(protect, admin, deleteGenre);

export default router;
