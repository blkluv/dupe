const express = require('express');
const axios = require('axios');
const cors = require('cors');  // ← ADD THIS
const app = express();
const port = process.env.PORT || 8080;

// Import routes
const trendingRoutes = require('./routes/trending');  // ← ADD THIS

// CORS middleware - ADD THIS BLOCK
app.use(cors({
  origin: 'https://dupe-eta.vercel.app',  // Your frontend URL
  credentials: true
}));

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Dupe API running' });
});

// Use trending routes - ADD THIS
app.use('/api/trending', trendingRoutes);

// Amazon search endpoint
app.get('/api/amazon/search', async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Missing search query' });
  }
  
  try {
    const response = await axios.get(
      'https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/amz/amazon-search-by-keyword-asin',
      {
        params: {
          domainCode: 'com',
          keyword: q,
          page: '1',
          excludeSponsored: 'false',
          sortBy: 'relevanceblender',
          withCache: 'true'
        },
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          'x-rapidapi-host': 'axesso-axesso-amazon-data-service-v1.p.rapidapi.com'
        }
      }
    );
    
    const products = response.data.searchProductDetails
      .filter(p => p.imgUrl && p.price)
      .slice(0, 8)
      .map(p => ({
        name: p.productDescription,
        brand: p.manufacturer || 'Amazon',
        price: p.price,
        image: p.imgUrl,
        link: `https://amazon.com/dp/${p.asin}/?tag=${process.env.AMAZON_ASSOCIATES_TAG || ''}`,
        productRating: p.productRating,
        countReview: p.countReview,
        asin: p.asin
      }));
    
    res.json(products);
  } catch (err) {
    console.error('Amazon API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});