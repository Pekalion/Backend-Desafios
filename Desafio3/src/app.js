const express = require('express');
const ProductManager = require('./ProductManager');
const app = express();
const port = 3000;

const productManager = new ProductManager('./src/productos.json');

app.use(express.json());

// Ruta para obtener todos los productos
app.get('/products', (req, res) => {
  const limit = req.query.limit;

  productManager.getProducts().then((products) => {
    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  });
});

// Ruta para obtener un producto por su ID
app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);

  productManager.getProductById(productId).then((product) => {
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
