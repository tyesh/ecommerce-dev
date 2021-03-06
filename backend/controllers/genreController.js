import expressAsyncHandler from 'express-async-handler';
import Genre from '../models/genresModel.js';

// @desc    Fetch genres
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

// @desc    Fetch all genres
// @route   GET /api/genres/all
// æaccess  Public
const getAllGenres = expressAsyncHandler(async (req, res) => {
  const genres = await Genre.find({});

  res.json({ genres });
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

// @desc    Delete a genre
// @route   Delete /api/genres/:id
// æaccess  Private/Admin
const deleteGenre = expressAsyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (genre) {
    await genre.remove();
    res.json({ genre: 'Genre removed' });
  } else {
    res.status(404);
    throw new Error('Genre not found');
  }
});

// @desc    Update a genre
// @route   PUT /api/genre/:id
// æaccess  Private/Admin
const updateGenre = expressAsyncHandler(async (req, res) => {
  const { name, image, highlight, color } = req.body;

  const genre = await Genre.findById(req.params.id);

  if (genre) {
    genre.name = name;
    genre.highlight = highlight;
    genre.image = image;
    genre.color = color;

    const updatedgenre = await genre.save();
    res.status(201).json(updatedgenre);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getGenres,
  getAllGenres,
  getGenreById,
  createGenre,
  deleteGenre,
  updateGenre,
};
