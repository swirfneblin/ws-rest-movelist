const { Movie } = require("../db/models");

const getAwardIntervals = async () => {
  const movies = await Movie.findAll();
  const producerWins = {};

  movies.forEach((movie) => {
    const producers = movie.producers.split(/,| and /);
    producers.forEach((producer) => {
      const name = producer.trim();
      if (!name) return;
      if (!producerWins[name]) {
        producerWins[name] = [];
      }
      producerWins[name].push(movie.year);
    });
  });

  const intervals = { min: [], max: [] };

  for (const [producer, years] of Object.entries(producerWins)) {
    years.sort((a, b) => a - b);
    for (let i = 1; i < years.length; i++) {
      const interval = years[i] - years[i - 1];
      const entry = {
        producer,
        interval,
        previousWin: years[i - 1],
        followingWin: years[i],
      };

      if (!intervals.min.length || interval < intervals.min[0].interval) {
        intervals.min = [entry];
      } else if (interval === intervals.min[0].interval) {
        intervals.min.push(entry);
      }

      if (!intervals.max.length || interval > intervals.max[0].interval) {
        intervals.max = [entry];
      } else if (interval === intervals.max[0].interval) {
        intervals.max.push(entry);
      }
    }
  }

  return intervals;
};

const getAll = async () => await Movie.findAll();

module.exports = { getAwardIntervals, getAll };
