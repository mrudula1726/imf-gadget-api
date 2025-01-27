const { Sequelize } = require('sequelize');
require('dotenv').config();  // Load environment variables from .env

// Create a new Sequelize instance (connect to PostgreSQL) using DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',   // Specify the database type
    logging: false,        // Disable logging; set to 'true' for debugging
});

// Test the connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected successfully!');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

// Export the sequelize connection
module.exports = sequelize;
