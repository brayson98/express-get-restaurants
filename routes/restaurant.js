const express = require("express")
const router = express.Router();
const Restaurant = require("../models/index.js")


router.get("/", async (req, res) => {
    const data = await Restaurant.findAll()
    res.json(data)
})

router.get('/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant)
})

router.post('/', async (req, res) => {
    try {
        const restaurant = await Restaurant.create(req.body);
        res.status(201).send(restaurant)

    } catch (err) {
        res.sendStatus(500)
        console.error(err)
    }
})

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router;