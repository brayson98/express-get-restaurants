const seedRestaurant = [
  {
    name: 'AppleBees',
    location: 'Texas',
    cuisine: 'FastFood'
  },
  {
    name: 'LittleSheep',
    location: 'Dallas',
    cuisine: 'Hotpot'
  },
  {
    name: 'Spice Grill',
    location: 'Houston',
    cuisine: 'Indian'
  }
]

const seedMenu = [
{
  title: 'Breakfast',
  restaurantId: 1  // Linking to AppleBees
},
{
  title: 'Lunch',
  restaurantId: 1  // Linking to AppleBees
},
{
  title: 'Dinner',
  restaurantId: 2  // Linking to LittleSheep
}
]

const seedItem = [
{
  name: 'bhindi masala',
  image: 'someimage.jpg',
  price: 9.50,
  vegetarian: true,
  menuId: 3  // Linking to Dinner menu of LittleSheep
},
{
  name: 'egusi soup',
  image: 'someimage.jpg',
  price: 10.50,
  vegetarian: false,
  menuId: 3  // Linking to Dinner menu of LittleSheep
},
{
  name: 'hamburger',
  image: 'someimage.jpg',
  price: 6.50,
  vegetarian: false,
  menuId: 1  // Linking to Breakfast menu of AppleBees
}
]

module.exports = {
seedRestaurant,
seedMenu,
seedItem,
};
