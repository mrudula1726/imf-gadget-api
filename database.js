const { Sequelize } = require('sequelize'); // Import Sequelize
require('dotenv').config(); // Load environment variables from .env

// Create a new Sequelize instance (connect to PostgreSQL)
const sequelize = new Sequelize(
    process.env.DB_NAME,    // Database name
    process.env.DB_USER,    // Database username
    process.env.DB_PASSWORD, // Database password
    {
        host: process.env.DB_HOST, // Database host
        port: process.env.DB_PORT, // Database port
        dialect: 'postgres',       // Specify the dialect
        logging: false,            // Disable logging; enable for debugging
    }
);

// Test the connection
sequelize
    .authenticate()
    .then(() => console.log('Database connected successfully!'))
    .catch((err) => console.error('Unable to connect to the database:', err));

// Export the connection
module.exports = sequelize;
