import express from 'express';
import {
  createGenre,
  getGenreById,
  getGenres,
} from '../controllers/genreController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(protect, admin, createGenre).get(getGenres);
router.route('/:id').get(getGenreById);

export default router;
