import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', category: '' });
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const newProduct = await res.json();
    setProducts([...products, newProduct]);

    setForm({ name: '', price: '', category: '' });
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ margin: '40px', fontFamily: 'Arial' }}>
      <h1>Product Manager</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ marginRight: '10px' }}
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
          style={{ marginRight: '10px' }}
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          style={{ marginRight: '10px' }}
        />

        <button type="submit">
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>

      <h2>Product List</h2>

      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p._id}>
              <strong>{p.name}</strong> — ₹{p.price} ({p.category})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
