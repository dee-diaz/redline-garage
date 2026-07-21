const db = require('../db/queries');

exports.categoriesGet = async (req, res) => {
  const title = 'Categories — Redline Garage';
  const categories = await db.getCategories();

  res.render('categories', {
    title,
    categories,
  });
};
