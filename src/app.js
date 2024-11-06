const express = require("express");
const app = express();
const db = require("../db/connection");
const restaurantRoutes = require("../routes/restaurant.js")
//TODO: Create your GET Request Route Below: 

app.use(express.json())

app.use("/restaurants", restaurantRoutes)



module.exports = app;