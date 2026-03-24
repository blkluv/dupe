const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Add this if you want to parse JSON bodies
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Dupe API running' });
});

// Trending endpoint
app.get('/api/trending', (req, res) => {
  res.json([]);
});

// Amazon search endpoint
app.get('/api/amazon/search', async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Missing search query' });
  }
  
  try {
    // This is a placeholder — replace with actual API call
    res.json({
      query: q,
      message: 'Amazon search would go here',
      products: []
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});