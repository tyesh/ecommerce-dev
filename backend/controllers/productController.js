import expressAsyncHandler from 'express-async-handler';
import Product from '../models/ProductModel.js';

// @desc Fetch all products
// @route GET /api/products
// æaccess Public
const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc Fetch single product
// @route GET /api/product/:id
// æaccess Public
const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product notfound');
  }
});

export { getProducts, getProductById };
