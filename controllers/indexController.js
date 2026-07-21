const db = require('../db/queries');

exports.featuredProductsGet = async (req, res) => {
  const title = 'Shop for auto parts at Redline Garage';
  const featuredProducts = await db.getFeaturedProducts();

  res.render('index', {
    title,
    featuredProducts,
  });
};
