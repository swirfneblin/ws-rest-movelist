const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const csv = require("csv-parser");

const db = new sqlite3.Database(":memory:");

function setupDatabase() {
  return new Promise((resolve, reject) => {
    db.run(
      `
            CREATE TABLE movies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                year INTEGER NOT NULL,
                title TEXT NOT NULL,
                producer TEXT NOT NULL
            )
        `,
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

function loadCSVData(filePath) {
  return new Promise((resolve, reject) => {
    const movies = [];
    fs.createReadStream(filePath)
      .pipe(csvParser({ separator: ";" }))
      .on("data", (row) => {
        if (row.winner?.toLowerCase() === "yes") {
          const producers = row.producers.split(",").map((p) => p.trim());
          producers.forEach((producer) => {
            movies.push({
              year: parseInt(row.year, 10),
              title: row.title,
              producer,
            });
          });
        }
      })
      .on("end", () => {
        const insertStmt = db.prepare(
          `INSERT INTO movies (year, title, producer) VALUES (?, ?, ?)`
        );
        movies.forEach((movie) => {
          insertStmt.run(movie.year, movie.title, movie.producer);
        });
        insertStmt.finalize();
        resolve();
      })
      .on("error", (err) => reject(err));
  });
}

db.serialize(() => {
  db.run(`
    CREATE TABLE movies (
      id INTEGER PRIMARY KEY,
      year INTEGER,
      title TEXT,
      studios TEXT,
      producers TEXT,
      winner TEXT
    )
  `);

  const insert = db.prepare(`
    INSERT INTO movies (year, title, studios, producers, winner)
    VALUES (?, ?, ?, ?, ?)
  `);

  fs.createReadStream("movelist.csv")
    .pipe(csv({ separator: ";" }))
    .on("data", (row) => {
      insert.run(
        row.year,
        row.title,
        row.studios,
        row.producers,
        row.winner || null
      );
    })
    .on("end", () => {
      insert.finalize();
    });
});

module.exports = db;
