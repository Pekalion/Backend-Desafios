import { Router } from "express";
import CartManager from "../cartManager.js"; // Importar la clase CartManager

const cartsRouter = Router();

// Crear una instancia de CartManager
const cartManager = new CartManager('./db/cart.json');

cartsRouter.post('/', async (req, res) => {
    try {
        const response = await req.cartManager.newCart();
        res.json(response);
    } catch (error) {
        console.log('Error al crear carrito');
        res.status(500).send('Error interno del servidor');
    }
});

cartsRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const response = await req.cartManager.getCartProducts(cid);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        await req.cartManager.addProductToCart(cid, pid);
        res.send('Producto agregado exitosamente');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
});

export { cartsRouter };
