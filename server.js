const express = require('express');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize'); // Import the database connection
const Gadget = require('./models/gadgets'); // Import the gadget connection
const gadgetRoutes = require('./routes/gadgets');
const User = require('./models/user');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Connect the PostgreSQL using Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host : process.env.DB_HOST,
    dialect : 'postgres',
});

//Test the connetion
sequelize
    .authenticate()
    .then(() => console.log('Database connected Successfully!'))
    .catch(err => console.error('Unable to connect to the Database!', err));

// Sync the specific model (Gadget)
Gadget.sync({ force: false }) // Sync only this model
    .then(() => console.log('Gadget table synced successfully!'))
    .catch((err) => console.error('Error syncing Gadget table:', err));

// Sync the User table
User.sync({ force: false }) // Sync only if not already synced
    .then(() => console.log('User table synced successfully!'))
    .catch((err) => console.error('Error syncing User table:', err));


//Middleware
app.use(express.json());

//Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to IMF Gadget API');
});

// Use the gadgets routes
app.use('/gadgets', gadgetRoutes);
app.use('/auth', authRoutes); // Add auth routes for registration and login

//Start the server
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
