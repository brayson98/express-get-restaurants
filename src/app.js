const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 

app.use(express.json())

app.get('/restaurants', async (req, res) => {
    const data = await Restaurant.findAll()
    res.json(data)
})

app.get('/restaurants/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant)
})

app.post('/restaurants', async (req, res) => {
    try {
        const restaurant = await Restaurant.create(req.body);
        res.status(201).send(restaurant)

    } catch (err) {
        res.sendStatus(500)
        console.error(err)
    }
})

app.put('/restaurants/:id', async (req, res) => {
    try {
        let restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) return res.sendStatus(404);
        restaurant = await restaurant.update(req.body, {where: {id: req.params.id}})
        res.send(restaurant)
    } catch (err) {
        res.sendStatus(500);
        console.error(err);
      }
})

app.delete('/restaurants/:id', async (req, res) => {
    try {
        let restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) return res.sendStatus(404);
        restaurant = await restaurant.destroy()
        res.send(restaurant)
    } catch (err) {
        res.sendStatus(500);
        console.error(err);
      }
})
module.exports = app;