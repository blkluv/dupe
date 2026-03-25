const express = require("express");
const router = express.Router();
const Trending = require("../models/Trending");

// GET top trending searches
router.get("/", async (req, res) => {
  try {
    const trending = await Trending.find()
      .sort({ count: -1 })
      .limit(8);
    
    // Return array even if empty
    res.json(trending || []);
  } catch (err) {
    console.error("Error fetching trending:", err);
    res.status(500).json({ error: "Failed to fetch trending searches" });
  }
});

// POST increment a search query
router.post("/track", async (req, res) => {
  try {
    const { query } = req.body;
    
    // Validate query
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: "Invalid query parameter" });
    }
    
    // Normalize the search term
    const normalized = query.toLowerCase().trim();
    
    // Update or create the trending entry
    const result = await Trending.findOneAndUpdate(
      { query: normalized },
      { 
        $inc: { count: 1 },
        $set: { updatedAt: Date.now() }
      },
      { 
        upsert: true, 
        new: true 
      }
    );
    
    res.json({ 
      success: true, 
      query: normalized, 
      count: result.count 
    });
  } catch (err) {
    console.error("Error tracking search:", err);
    res.status(500).json({ error: "Failed to track search" });
  }
});

// DELETE endpoint to clear trending (useful for testing/admin)
router.delete("/clear", async (req, res) => {
  try {
    await Trending.deleteMany({});
    res.json({ success: true, message: "Trending data cleared" });
  } catch (err) {
    console.error("Error clearing trending:", err);
    res.status(500).json({ error: "Failed to clear trending data" });
  }
});

module.exports = router;