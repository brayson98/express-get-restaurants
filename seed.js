const { Restaurant, Menu, Item } = require("./models/index");
const { seedRestaurant, seedMenu, seedItem } = require("./seedData");
const db = require("./db/connection");

const syncSeed = async () => {
  try {
    // Sync the database (drops existing tables and recreates them)
    await db.sync({ force: true });

    // Bulk create Restaurant, Menu, and Item entries
    await Restaurant.bulkCreate(seedRestaurant);
    await Menu.bulkCreate(seedMenu);
    await Item.bulkCreate(seedItem);

   

    console.log("Database synced and seeded successfully!");
  } catch (error) {
    console.error("Error syncing and seeding the database:", error);
  }
};

syncSeed();
