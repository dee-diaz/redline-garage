require('dotenv').config();
const express = require('express');
const path = require('node:path');
const PORT = process.env.PORT || 3000;
const indexRouter = require('./routes/indexRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const brandsRouter = require('./routes/brandsRouter');
const productsRouter = require('./routes/productsRouter');
const wishlistRouter = require('./routes/wishlistRouter');

const app = express();

// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', indexRouter);
app.use('/categories', categoriesRouter);
app.use('/brands', brandsRouter);
app.use('/products', productsRouter);
app.use('/wishlist', wishlistRouter);

// Start server
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});
