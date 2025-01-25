const {Pool} = require("pg")

// Replace these values with your PostgreSQL database details
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'twitter-clone',
    password: 'DiegoSQL0324',
    port: 5432,
  });
  
pool.connect((err) => {
    if (err) {
      console.error('Error connecting to PostgreSQL database:', err.message);
    } else {
      console.log('Connected to PostgreSQL database');
    }
});
  
module.exports = pool;