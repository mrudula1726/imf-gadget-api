const { DataTypes } = require('sequelize');
const sequelize = require('../database');

//Define Gadget Model
const Gadget = sequelize.define('Gadget', {
    id:{
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4, // Automatically generates a unique ID
        primaryKey : true,
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    status : {
        type : DataTypes.ENUM('Available', 'Deployed', 'Destroyed', 'Decommissioned'), //Gadget statuses
        defaultValue: 'Available',
    },
});

module.exports = Gadget;