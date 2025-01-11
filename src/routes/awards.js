const express = require("express");
const { getAwardIntervals } = require("../services/awardService");
const router = express.Router();

router.get("/intervals", async (req, res) => {
  try {
    const intervals = await getAwardIntervals();
    res.json(intervals);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
