const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8080;

// Import routes
const trendingRoutes = require('./routes/trending');

// DYNAMIC CORS - Handles Vercel Previews & Local Dev
const allowedOrigins = [
  'https://dupe-eta.vercel.app',
  /\.vercel\.app$/, // Allows all Vercel preview branches
  'http://localhost:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.some(pattern => 
      typeof pattern === 'string' ? pattern === origin : pattern.test(origin)
    )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// Health check for Railway
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'Dupe API', timestamp: new Date() });
});

app.use('/api/trending', trendingRoutes);

// Amazon search endpoint
app.get('/api/amazon/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing search query' });
  
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
    
    // ROBUST MAPPING with fallbacks
    const products = (response.data.searchProductDetails || [])
      .filter(p => p.imgUrl && (p.price || p.priceAmount))
      .slice(0, 8)
      .map(p => ({
        name: p.productDescription || p.title || 'Product Info Unavailable',
        brand: p.manufacturer || 'Verified Seller',
        price: p.price || `$${p.priceAmount}`,
        image: p.imgUrl,
        link: `https://amazon.com/dp/${p.asin}/?tag=${process.env.AMAZON_ASSOCIATES_TAG || 'dupe0a-20'}`,
        productRating: p.productRating,
        countReview: p.countReview,
        asin: p.asin
      }));
    
    res.json(products);
  } catch (err) {
    console.error('Amazon API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Amazon search is temporarily unavailable.' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Billion-Dollar Backend live on port ${port}`);
});