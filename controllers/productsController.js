const db = require('../db/queries');

exports.productsGet = async (req, res) => {
  try {
    const title = 'Products | Redline Garage';

    const parseMulti = (value) => ([].concat(value || []).flatMap((v) => v.split(',')));

    const selectedCategories = parseMulti(req.query.category);
    const selectedBrands = parseMulti(req.query.brand);
    const minPrice = req.query.minPrice || '';
    const maxPrice = req.query.maxPrice || '';
    const inStock = req.query.inStock === 'true';

    const [products, categories, brands] = await Promise.all([
      db.getProducts({
        categories: selectedCategories,
        brands: selectedBrands,
        minPrice,
        maxPrice,
        inStock,
      }),
      db.getCategories(),
      db.getBrands(),
    ]);

    res.render('products', {
      title,
      products,
      categories,
      brands,
      selectedCategories,
      selectedBrands,
      minPrice,
      maxPrice,
      inStock,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};
