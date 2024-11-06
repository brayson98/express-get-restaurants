const Restaurant = require('./Restaurant')
const Menu = require("./Menu")
const Item = require("./Item")

Restaurant.hasMany(Menu, {
    foreignKey: 'restaurantId'
    
  });
  Menu.belongsTo(Restaurant, {
    foreignKey: 'restaurantId',
  });

  Menu.belongsToMany(Item, {
    through: 'MenuItems',  
    foreignKey: 'menuId',
  });
  Item.belongsToMany(Menu, {
    through: 'MenuItems',
    foreignKey: 'itemId',
  });
  


module.exports = {Restaurant, Menu, Item};