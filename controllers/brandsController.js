const db = require('../db/queries');

exports.brandsGet = async (req, res) => {
  const title = 'Brands | Redline Garage';
  const brands = await db.getBrands();

  res.render('brands', {
    title,
    brands,
    brandfetchClientId: process.env.BRANDFETCH_CLIENT_ID,
  });
};