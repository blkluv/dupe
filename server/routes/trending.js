const express = require("express");
const router = express.Router();
const Trending = require("../models/Trending");

// GET top trending searches
router.get("/", async (req, res) => {
  try {
    const trending = await Trending.find()
      .sort({ count: -1 })
      .limit(8);
    res.json(trending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST increment a search query
router.post("/track", async (req, res) => {
  try {
    const { query } = req.body;
    const normalized = query.toLowerCase().trim();
    const result = await Trending.findOneAndUpdate(
      { query: normalized },
      { $inc: { count: 1 }, updatedAt: Date.now() },
      { upsert: true, new: true }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;