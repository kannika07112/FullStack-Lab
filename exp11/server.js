const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/shop')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  inStock: Boolean
});

const Product = mongoose.model('Product', productSchema);

// Insert sample data (runs only once)
async function insertSampleData() {
  const count = await Product.countDocuments();

  if (count === 0) {
    await Product.insertMany([
      { name: 'Laptop', category: 'Electronics', price: 50000, inStock: true },
      { name: 'Phone', category: 'Electronics', price: 20000, inStock: false },
      { name: 'Shoes', category: 'Fashion', price: 1500, inStock: true }
    ]);
    console.log('Sample products inserted!');
  }
}

insertSampleData();

// /products endpoint
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
