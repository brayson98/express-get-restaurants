const  DataTypes = require("sequelize");
const db = require("../db/connection");

const Restaurant = db.define('restaurants', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,  // This column should be in the model
    cuisine: DataTypes.STRING
 });
 

module.exports = Restaurant;