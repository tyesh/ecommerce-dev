import expressAsyncHandler from 'express-async-handler';
import Genre from '../models/genresModel.js';

// @desc    Fetch all genres
// @route   GET /api/genres
// æaccess  Public
const getGenres = expressAsyncHandler(async (req, res) => {
  const genres = await Genre.find({ ...keyword });

  res.json(genres);
});

// @desc    Fetch single genre
// @route   GET /api/genres/:id
// æaccess  Public
const getGenreById = expressAsyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (genre) {
    res.json(genre);
  } else {
    res.status(404);
    throw new Error('Genre not found');
  }
});

// @desc    Create genre
// @route   POST /api/genres/
// æaccess  Private/Admin
const createGenre = expressAsyncHandler(async (req, res) => {
  const { name, image, highlight } = req.body;

  const genre = new Genre({
    name: name,
    price: image,
    user: req.user._id,
    image: image,
    highlight: highlight,
  });

  const createdGenre = await genre.save();
  res.status(201).json(createdGenre);
});

export { getGenres, getGenreById, createGenre };
