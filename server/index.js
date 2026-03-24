const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Dupe API running' });
});

app.get('/api/trending', (req, res) => {
  res.json([]);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
