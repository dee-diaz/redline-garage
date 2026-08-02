const db = require('../db/queries');

exports.productsGet = async (req, res) => {
  try {
    const title = 'Products | Redline Garage';

    const { categoriesParams, brandsParams, priceParams, isInStockParams } =
      req.query;

    let [products, categories, brands] = await Promise.all([
      db.getProducts(),
      db.getCategories(),
      db.getBrands(),
    ]);

    res.render('products', {
      title,
      products,
      categories,
      brands,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};
