const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
    { id: 1, name: "Mobile", price: 12000 },
    { id: 2, name: "Laptop", price: 25000 },
    { id: 3, name: "Keyboard", price: 1200 }
];

// GET all products
app.get("/products", (req, res) => {
    res.json(products);
});

// CREATE a new product
app.post("/products", (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// GET product by ID
app.get("/products/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).send("Product not found");
    }
});

// UPDATE product by ID
app.put("/products/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);

    if (product) {
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        res.json(product);
    } else {
        res.status(404).send("Product not found");
    }
});

// DELETE product by ID
app.delete("/products/:id", (req, res) => {
    const initialLength = products.length;
    products = products.filter(p => p.id != req.params.id);

    if (products.length < initialLength) {
        res.status(200).send("Product deleted");
    } else {
        res.status(404).send("Product not found");
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
