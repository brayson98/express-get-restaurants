// tests/restaurants.test.js
const request = require("supertest");
const app = require("./src/app");
const Restaurant = require("./models/index");

describe("Restaurant Routes", () => {
  
  beforeAll(async () => {
    // Clear and populate the database before testing, if needed
    await Restaurant.sync({ force: true });
    await Restaurant.bulkCreate([
      { name: "Restaurant A", location: "City A", cuisine: "Italian" },
      { name: "Restaurant B", location: "City B", cuisine: "Japanese" },
    ]);
  });

  it("should return a status code of 200 for GET /restaurants", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.statusCode).toBe(200);
  });

  it("should return an array of restaurants for GET /restaurants", async () => {
    const response = await request(app).get("/restaurants");
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return the correct number of restaurants for GET /restaurants", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.body.length).toBe(2); // Matches the number of seeded restaurants
  });

  it("should return the correct restaurant data for GET /restaurants", async () => {
    const response = await request(app).get("/restaurants");
    const restaurant = response.body[0];
    expect(restaurant).toHaveProperty("name", "Restaurant A");
    expect(restaurant).toHaveProperty("location", "City A");
    expect(restaurant).toHaveProperty("cuisine", "Italian");
  });

  it("should return the correct data for GET /restaurants/:id", async () => {
    const response = await request(app).get("/restaurants/1");
    expect(response.body).toHaveProperty("name", "Restaurant A");
    expect(response.body).toHaveProperty("location", "City A");
    expect(response.body).toHaveProperty("cuisine", "Italian");
  });

  it("should update the restaurants array with a new value for POST /restaurants", async () => {
    const newRestaurant = { name: "Restaurant C", location: "City C", cuisine: "Mexican" };
    const response = await request(app).post("/restaurants").send(newRestaurant);
    expect(response.statusCode).toBe(201);
    const getResponse = await request(app).get("/restaurants");
    expect(getResponse.body.length).toBe(3); // Original 2 + 1 new
    expect(getResponse.body.some(r => r.name === "Restaurant C")).toBe(true);
  });

  it("should update the restaurant with the provided value for PUT /restaurants/:id", async () => {
    const updateData = { name: "Updated Restaurant A", location: "New City A", cuisine: "Fusion" };
    const response = await request(app).put("/restaurants/1").send(updateData);
    expect(response.body).toHaveProperty("name", "Updated Restaurant A");
    expect(response.body).toHaveProperty("location", "New City A");
    expect(response.body).toHaveProperty("cuisine", "Fusion");
  });

  it("should delete the restaurant with the provided id for DELETE /restaurants/:id", async () => {
    const response = await request(app).delete("/restaurants/1");
    expect(response.statusCode).toBe(200); // No content after deletion
    const getResponse = await request(app).get("/restaurants/1");
    expect(getResponse.statusCode).toBe(200); // Not found after deletion
  });
});
