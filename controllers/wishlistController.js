const db = require('../db/queries');

exports.wishlistGet = async (req, res) => {
  try {
    const title = 'Wishlist | Redline Garage';
    const wishlistItems = await db.getWishlist();
    const wishlistIds = await db.getWishlishIds();

    res.render('wishlist', {
      title,
      wishlistItems,
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

exports.wishlistPost = async (req, res) => {
  try {
    const itemId = req.body.itemId;
    await db.postWishlist(itemId);
    res.status(201).end();
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Error | Redline Garage',
      message: 'Something went wrong. Please try again later.',
    });
  }
};

exports.wishlistDelete = async (req, res) => {
  try {
    const itemId = req.body.itemId;
    await db.deleteWishlist(itemId);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Error | Redline Garage',
      message: 'Something went wrong. Please try again later.',
    });
  }
};
