const pool = require('./pool');

async function getFeaturedProducts() {
  const { rows } = await pool.query(`
    SELECT items.id AS id, items.name AS name, items.price AS price, brands.name AS brand, categories.name AS category, items.image_url AS image, items.stock AS stock
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

async function getBrands() {
  const { rows } = await pool.query(
    'SELECT name, country FROM brands ORDER BY name;',
  );

  return rows;
}

const SORT_OPTIONS = {
  'name-asc': 'name ASC',
  'name-desc': 'name DESC',
  'price-asc': 'items.price ASC',
  'price-desc': 'items.price DESC',
};

async function getProducts(filters = {}) {
  const { categories, brands, minPrice, maxPrice, inStock, sort } = filters;

  const conditions = [];
  const values = [];

  if (categories && categories.length > 0) {
    values.push(categories);
    conditions.push(`categories.name = ANY($${values.length})`);
  }

  if (brands && brands.length > 0) {
    values.push(brands);
    conditions.push(`brands.name = ANY($${values.length})`);
  }

  if (minPrice) {
    values.push(minPrice);
    conditions.push(`items.price >= $${values.length}`);
  }

  if (maxPrice) {
    values.push(maxPrice);
    conditions.push(`items.price <= $${values.length}`);
  }

  if (inStock) {
    conditions.push('items.stock > 0');
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const orderBy = SORT_OPTIONS[sort] || SORT_OPTIONS['name-asc'];

  const { rows } = await pool.query(
    `
    SELECT items.id AS id, items.name AS name, items.price AS price, brands.name AS brand, categories.name AS category, items.image_url AS image, items.stock AS stock
    FROM items
    LEFT JOIN categories ON items.category_id = categories.id
    LEFT JOIN brands ON items.brand_id = brands.id
    ${whereClause}
    ORDER BY ${orderBy};
  `,
    values,
  );

  return rows;
}

async function getProductDetails(id) {
  const { rows } = await pool.query(
    `
    SELECT items.id AS id, items.name AS name, items.price AS price, brands.name AS brand, categories.name AS category, items.image_url AS image, items.stock AS stock
    FROM items
    LEFT JOIN categories ON items.category_id = categories.id
    LEFT JOIN brands ON items.brand_id = brands.id
    WHERE items.id = ${id}
    `
  )

  return rows[0];
}

async function getRelatedProducts(id) {
  const { rows: categoryRows } = await pool.query(
    `
    SELECT categories.name AS category
    FROM items
    LEFT JOIN categories ON items.category_id = categories.id
    WHERE items.id = ${id}
    `
  );
  const category = categoryRows[0]?.category;

  const { rows } = await pool.query(
    `
    SELECT items.id AS id, items.name AS name, items.price AS price, brands.name AS brand, categories.name AS category, items.image_url AS image, items.stock AS stock
    FROM items
    LEFT JOIN categories ON items.category_id = categories.id
    LEFT JOIN brands ON items.brand_id = brands.id
    WHERE items.stock > 0 AND categories.name = $1
    LIMIT 4;
    `,
    [category],
  );

  return rows;
}


module.exports = {
  getFeaturedProducts,
  getCategories,
  getBrands,
  getProducts,
  getProductDetails,
  getRelatedProducts,
};
