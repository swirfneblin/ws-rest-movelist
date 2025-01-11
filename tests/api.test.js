const request = require("supertest");
const app = require("../app");

describe("API Integration Tests", () => {
  it("should return producers with min and max intervals", async () => {
    const response = await request(app).get("/producers/intervals");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("min");
    expect(response.body).toHaveProperty("max");
  });
});
