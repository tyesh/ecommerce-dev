import expressAsyncHandler from 'express-async-handler';
import Author from '../models/authorModel.js';

// @desc    Fetch all author
// @route   GET /api/authors
// æaccess  Public
const getAuthor = expressAsyncHandler(async (req, res) => {
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
  const count = await Author.count({ ...keyword });
  const authors = await Author.find({ ...keyword })
    .limit(pagesize)
    .skip(pagesize * (page - 1));

  res.json({ authors, page, pages: Math.ceil(count / pagesize) });
});

// @desc    Fetch single author
// @route   GET /api/authors/:id
// æaccess  Public
const getAuthorById = expressAsyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);

  if (author) {
    res.json(author);
  } else {
    res.status(404);
    throw new Error('Author not found');
  }
});

// @desc    Create author
// @route   POST /api/authors/
// æaccess  Private/Admin
const createAuthor = expressAsyncHandler(async (req, res) => {
  const { name, image, highlight, color } = req.body;

  const author = new Author({
    name: name,
    price: image,
    user: req.user._id,
    image: image,
    highlight: highlight,
    color: color,
  });

  const createdAuthor = await author.save();
  res.status(201).json(createdAuthor);
});

// @desc    Delete a author
// @route   Delete /api/authors/:id
// æaccess  Private/Admin
const deleteAuthor = expressAsyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);

  if (author) {
    await author.remove();
    res.json({ author: 'Author removed' });
  } else {
    res.status(404);
    throw new Error('Author not found');
  }
});

// @desc    Update a author
// @route   PUT /api/authors/:id
// æaccess  Private/Admin
const updateAuthor = expressAsyncHandler(async (req, res) => {
  const { name, image, highlight, color } = req.body;

  const author = await Author.findById(req.params.id);

  if (author) {
    author.name = name;
    author.highlight = highlight;
    author.image = image;
    author.color = color;

    const updatedAuthor = await author.save();
    res.status(201).json(updatedAuthor);
  } else {
    res.status(404);
    throw new Error('Author not found');
  }
});

export { getAuthor, getAuthorById, createAuthor, deleteAuthor, updateAuthor };
