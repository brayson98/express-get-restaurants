const express = require("express")
const router = express.Router();
const {Restaurant, Menu, Item} = require("../models/index.js")
const [check, validationResult] = require("express-validator")

router.get("/", async (req, res) => {
    try {
        const data = await Restaurant.findAll({
            include: [
                {
                    model: Menu,  // Include Menus for each Restaurant
                    include: [
                        {
                            model: Item,  // Include Items for each Menu
                        },
                    ],
                },
            ],
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "An error occurred while fetching restaurants." });
        console.error(err);
    }
});

router.get('/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant)
})

router.post('/',[
        check("name").notEmpty().withMessage("Name is required").isLength({ min: 10, max: 30 }).trim(),
        check("location").notEmpty().withMessage("Location is required").trim(),
        check("cuisine").notEmpty().withMessage("Cuisine is required").trim()
],  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({error: errors.array()})
    } else {

        
        try {
            const restaurant = await Restaurant.create(req.body);
            res.status(201).send(restaurant)
            
        } catch (err) {
            res.sendStatus(500)
            console.error(err)
        }
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