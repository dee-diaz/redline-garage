const db = require('../db/queries');

exports.productsGet = async (req, res) => {
  try {
    const wishlistIds = await db.getWishlishIds();
    const title = 'Products | Redline Garage';

    const parseMulti = (value) =>
      [].concat(value || []).flatMap((v) => v.split(','));

    const selectedCategories = parseMulti(req.query.category);
    const selectedBrands = parseMulti(req.query.brand);
    const minPrice = req.query.minPrice || '';
    const maxPrice = req.query.maxPrice || '';
    const inStock = req.query.inStock === 'true';
    const sort = req.query.sort || 'name-asc';

    const [products, categories, brands] = await Promise.all([
      db.getProducts({
        categories: selectedCategories,
        brands: selectedBrands,
        minPrice,
        maxPrice,
        inStock,
        sort,
      }),
      db.getCategories(),
      db.getBrands(),
    ]);

    res.render('products', {
      title,
      wishlistIds,
      products,
      categories,
      brands,
      selectedCategories,
      selectedBrands,
      minPrice,
      maxPrice,
      inStock,
      sort,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Error | Redline Garage',
      message: 'Something went wrong. Please try again later.',
    });
  }
};

exports.productDetailsGet = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await db.getProductDetails(id);

    if (!product) {
      return res.status(404).render('error', {
        title: 'Product not found | Redline Garage',
        message: "This product doesn't exist or has been removed.",
      });
    }

    const relatedProducts = await db.getRelatedProducts(id);
    const wishlistIds = await db.getWishlishIds();
    const title = `${product.name} - ${product.brand} - Redline Garage`
    res.render('single-product', {
      title,
      product,
      relatedProducts,
      wishlistIds,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Error | Redline Garage',
      message: 'Something went wrong. Please try again later.',
    });
  }
};
