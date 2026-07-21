const db = require('../db/queries');

exports.featuredProductsGet = async (req, res) => {
  const featuredProducts = await db.getFeaturedProducts();
  const title = 'Shop for auto parts at Redline Garage';

  res.render('index', {
    title,
    featuredProducts,
  });
};
