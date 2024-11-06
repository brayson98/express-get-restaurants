const { Restaurant, Menu, Item } = require("./models/index");
const { seedRestaurant, seedMenu, seedItem } = require("./seedData");
const db = require("./db/connection");

const syncSeed = async () => {
  try {
    // Force sync to drop and recreate tables based on model definitions
    await db.sync({ force: true });

    // Bulk create Restaurant, Menu, and Item entries
    await Restaurant.bulkCreate(seedRestaurant);
    await Menu.bulkCreate(seedMenu);
    await Item.bulkCreate(seedItem);

    // Associate Menus with Restaurants
    const restaurants = await Restaurant.findAll();
    const menus = await Menu.findAll();
    const items = await Item.findAll();

    // Associate each menu with a restaurant
    for (const menu of menus) {
      const restaurant = restaurants[Math.floor(Math.random() * restaurants.length)]; // Randomly assign a restaurant
      await menu.setRestaurant(restaurant);
    }

    // Associate Items with Menus (many-to-many relationship)
    for (const item of items) {
      const menu = menus[Math.floor(Math.random() * menus.length)]; // Randomly assign a menu
      await menu.addItem(item); // Many-to-many association
    }

    console.log("Database synced and seeded successfully!");
  } catch (error) {
    console.error("Error syncing and seeding the database:", error);
  }
};

syncSeed();
