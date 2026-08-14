require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on("connect", (client) => {
  client.query("SET search_path TO public");
});

module.exports = pool;
