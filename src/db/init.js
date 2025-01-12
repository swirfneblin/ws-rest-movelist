const { sequelize } = require("../config/database");
const { Movie } = require("./models");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

async function initializeDatabase() {
  await sequelize.authenticate();
  await Movie.sync({ force: true });

  const csvPath = path.join(__dirname, "../assets/movielist.csv");
  const movies = [];

  fs.createReadStream(csvPath)
    .pipe(csv({ separator: ";" }))
    .on("data", (data) => {
      if ((data?.winner || "").toLowerCase() === "yes") {
        movies.push({
          year: parseInt(data.year, 10),
          title: data.title,
          producers: data.producers,
        });
      }
    })
    .on("end", async () => {
      await Movie.bulkCreate(movies);
      console.log("Database initialized");
    });
}

module.exports = { sequelize, initializeDatabase };
