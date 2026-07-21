require('dotenv').config();
const express = require('express');
const path = require('node:path');
const PORT = process.env.PORT || 3000;
const indexRouter = require('./routes/indexRouter');
const categoriesRouter = require('./routes/categoriesRouter');

const app = express();

// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/', indexRouter);
app.use('/categories', categoriesRouter);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});
