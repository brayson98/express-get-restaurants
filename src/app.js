const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 

app.get('/restaurants', async (req, res) => {
    const data = await Restaurant.findAll()
    res.json(data)
})


module.exports = app;