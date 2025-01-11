const express = require("express");
const { getAwardIntervals, getAll } = require("../services/awardService");
const router = express.Router();

router.get("/intervals", async (req, res) => {
  try {
    const intervals = await getAwardIntervals();
    res.json(intervals);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const movies = await getAll();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
