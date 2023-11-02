const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();
      const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
      product.id = id;
      products.push(product);
      await this.saveProducts(products);
      console.log("Producto agregado con éxito.");
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe, se devuelve un arreglo vacío
      return [];
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((p) => p.id === id);
      if (product) {
        return product;
      } else {
        console.error("Producto no encontrado.");
      }
    } catch (error) {
      console.error("Error al buscar el producto:", error);
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((p) => p.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct, id };
        await this.saveProducts(products);
        console.log("Producto actualizado con éxito.");
      } else {
        console.error("Producto no encontrado.");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const updatedProducts = products.filter((p) => p.id !== id);
      if (products.length !== updatedProducts.length) {
        await this.saveProducts(updatedProducts);
        console.log("Producto eliminado con éxito.");
      } else {
        console.error("Producto no encontrado.");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }

  async saveProducts(products) {
    const data = JSON.stringify(products, null, 2);
    await fs.promises.writeFile(this.path, data);
  }
}

// Ejemplo de uso:
const productManager = new ProductManager('productos.json');

// Agregar un producto
productManager.addProduct({
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 10.99,
    thumbnail: "imagen1.jpg",
    code: "P1",
    stock: 100,
  });
  
  // Buscar un producto por ID
  const productId = 1;
  const foundProduct = productManager.getProductById(productId);
  console.log("Producto encontrado por ID:");
  console.log(foundProduct);
  
  // Actualizar un producto
  productManager.updateProduct(productId, {
    title: "Producto Actualizado",
    price: 19.99,
  });
  const updatedProduct = productManager.getProductById(productId);
  console.log("Producto actualizado:");
  console.log(updatedProduct);
  
  // Eliminar un producto
  productManager.deleteProduct(productId);
  const deletedProduct = productManager.getProductById(productId);
  console.log("Producto eliminado:");
  console.log(deletedProduct);