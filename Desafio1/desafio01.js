class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1; // Para generar IDs autoincrementables
    }
  
    addProduct(product) {
      // Validar que todos los campos sean obligatorios
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock
      ) {
        console.error("Todos los campos son obligatorios.");
        return;
      }
  
      // Validar que no se repita el campo "code"
      const codeExists = this.products.some((existingProduct) => existingProduct.code === product.code);
      if (codeExists) {
        console.error("El producto con el mismo código ya existe.");
        return;
      }
  
      // Agregar el producto con un ID autoincrementable
      const productWithId = { id: this.nextId, ...product };
      this.products.push(productWithId);
      this.nextId++;
  
      console.log("Producto agregado con éxito.");
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        return product;
      } else {
        console.error("Producto no encontrado.");
      }
    }
  }
  
  // Ejemplo de uso:
  
  const productManager = new ProductManager();
  
  productManager.addProduct({
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 10.99,
    thumbnail: "imagen1.jpg",
    code: "P1",
    stock: 100,
  });
  
  productManager.addProduct({
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 15.99,
    thumbnail: "imagen2.jpg",
    code: "P2",
    stock: 50,
  });
  productManager.addProduct({
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 45.99,
    thumbnail: "imagen2.jpg",
    code: "P2",
    stock: 10,
  });
  
  console.log("Todos los productos:");
  console.log(productManager.getProducts());
  
  const productId = 2;
  console.log(`Producto con ID ${productId}:`);
  console.log(productManager.getProductById(productId));
  