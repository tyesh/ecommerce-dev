import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import colors from 'colors';
import morgan from 'morgan';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/usersRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import genreRoutes from './routes/genreRoutes.js';
import uploadRoutes from './routes/UploadRoutes.js';
import authorRoutes from './routes/authorRoutes.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/upload', uploadRoutes);

app.use('/api/config/emailjs', (req, res) =>
  res.json({
    REACT_APP_EMAIL_SERVICE: process.env.REACT_APP_EMAIL_SERVICE,
    REACT_APP_TEMPLATE_ID: process.env.REACT_APP_TEMPLATE_ID,
    REACT_APP_EMAILJS_KEY: process.env.REACT_APP_EMAILJS_KEY,
  })
);

app.use('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.use('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
