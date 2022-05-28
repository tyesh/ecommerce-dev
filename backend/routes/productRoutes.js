import express from 'express';
import expressAsyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/ProductModel.js';

// @desc Fetch all products
// @route GET /api/products
// æaccess Public
router.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// @desc Fetch single product
// @route GET /api/product/:id
// æaccess Public
router.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product notfound');
    }
  })
);

export default router;
