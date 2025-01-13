const request = require("supertest");
const app = require("../src/app");
const fs = require("fs");
const path = require("path");
const { sequelize, initializeDatabase } = require("../src/db/init");
const csvParse = require("csv-parse/sync");

describe("API Integration Tests", () => {
  let response, data;
  const csvPath = "../src/assets/movielist.csv";

  beforeAll(async () => {
    await initializeDatabase();
    response = await request(app).get("/producers/intervals");
    data = response.body;
  });

  afterAll(async () => await sequelize.close());

  test("Should return properties with min and max intervals", async () => {
    expect(response.status).toBe(200);
    expect(Array.isArray(data.min)).toBe(true);
    expect(Array.isArray(data.max)).toBe(true);
  });

  it("Should validate that 'min' array property has at least one object with the expected properties", async () => {
    if (!data.min.length) return;

    expect(data.min.length).toBeGreaterThan(0);

    for (const obj of data.min) {
      expect(obj).toHaveProperty("producer");
      expect(obj).toHaveProperty("interval");
      expect(obj).toHaveProperty("previousWin");
      expect(obj).toHaveProperty("followingWin");

      expect(obj.producer).toBeTruthy();
      expect(obj.interval).toBeTruthy();
      expect(obj.previousWin).toBeTruthy();
      expect(obj.followingWin).toBeTruthy();
    }
  });

  it("Should validate that 'max' array property has at least one object with the expected properties", async () => {
    if (!data.max.length) return;

    expect(data.max.length).toBeGreaterThan(0);

    for (const obj of data.max) {
      expect(obj).toHaveProperty("producer");
      expect(obj).toHaveProperty("interval");
      expect(obj).toHaveProperty("previousWin");
      expect(obj).toHaveProperty("followingWin");

      expect(obj.producer).toBeTruthy();
      expect(obj.interval).toBeTruthy();
      expect(obj.previousWin).toBeTruthy();
      expect(obj.followingWin).toBeTruthy();
    }
  });

  it("Should return the API data exactly as in the CSV", async () => {
    const csvFilePath = path.resolve(__dirname, csvPath);
    const fileContent = fs.readFileSync(csvFilePath, "utf-8");

    const records = csvParse.parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      delimiter: ";",
      cast: (value, context) => {
        if (context.column === "year") {
          return parseInt(value, 10);
        }
        return value;
      },
    });

    const responseMovies = await request(app).get("/producers/all");

    expect(responseMovies.status).toBe(200);
    expect(responseMovies.body).toEqual(records);
  });
});
