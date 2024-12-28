const express = require('express');
const Product = require('./models/Product');
const path = require('path');

const app = express();
const port = 3001;

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
console.log(await Product.findAll());
