const pool = require('./pool');

async function getFeaturedProducts() {
  const { rows } = await pool.query(`
    SELECT items.name AS name, items.price AS price, brands.name AS brand, categories.name AS category, items.image_url AS image, items.stock AS stock
    FROM items
    LEFT JOIN categories ON items.category_id = categories.id
    LEFT JOIN brands ON items.brand_id = brands.id
    WHERE items.stock < 6
    LIMIT 16;
  `);
  return rows;
}

async function getCategories() {
  const { rows } = await pool.query(
    'SELECT name, description FROM categories ORDER BY name;',
  );

  return rows;
}

module.exports = {
  getFeaturedProducts,
  getCategories,
};
