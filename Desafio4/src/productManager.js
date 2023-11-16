import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export class ProductManager {

    constructor() {
        this.path = './db/products.json'
        this.products = []
    }

    addProduct = async ({ title, description, price, thumbnail, code, stock, status, category }) => {
        try {
            const id = uuidv4();
            let newProduct = { id, title, description, price, thumbnail, code, stock, status, category };
            this.products = await this.getProducts();
            this.products.push(newProduct);
            await fs.writeFile(this.path, JSON.stringify(this.products));
            return newProduct;
        } catch (error) {
            console.error('Error al agregar un producto:', error);
            throw error;
        }
    };

    getProducts = async () => {
        try {
            const response = await fs.readFile(this.path, 'utf8');
            const responseJSON = JSON.parse(response);
    
            if (Array.isArray(responseJSON)) {
                return responseJSON;
            } else {
                console.error('El contenido de products.json no es un array válido.');
                return [];
            }
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.error('El archivo products.json no existe.');
                return [];
            } else {
                console.error('Error al leer products.json:', error);
                return [];
            }
        }
    };

    getProductById = async (id) => {
        const response = await this.getProducts()

        const product = response.find(product => product.id === id)

        if (product){
            return product
        } else {
            console.log('Producto no encontrado');
        }
    }

    updateProduct = async (id, {...data}) => {
        const response = await this.getProducts()

        const index = response.findIndex(product => product.id === id)

        if(index !== -1){
            response[index] = {id, ...data}
            await fs.writeFile(this.path, JSON.stringify(response))
            return response[index]
        } else{
            console.log('Producto no encontrado');
        }
    }

    deleteProduct = async (id) => {
        const response = await this.getProducts()

        const index = response.findIndex(product => product.id === id)

        if(index !== -1) {
            response.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(response))
        }else{
            console.log('producto no encontrado');
        }
    }
}