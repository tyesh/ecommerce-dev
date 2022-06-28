import expressAsyncHandler from 'express-async-handler';
import Genre from '../models/genresModel.js';

// @desc    Fetch all genres
// @route   GET /api/genres
// æaccess  Public
const getGenres = expressAsyncHandler(async (req, res) => {
  const pagesize = 10;

  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await Genre.count({ ...keyword });
  const genres = await Genre.find({ ...keyword })
    .limit(pagesize)
    .skip(pagesize * (page - 1));

  res.json({ genres, page, pages: Math.ceil(count / pagesize) });
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
  const { name, image, highlight, color } = req.body;

  const genre = new Genre({
    name: name,
    price: image,
    user: req.user._id,
    image: image,
    highlight: highlight,
    color: color,
  });

  const createdGenre = await genre.save();
  res.status(201).json(createdGenre);
});

export { getGenres, getGenreById, createGenre };
