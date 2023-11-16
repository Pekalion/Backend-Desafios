// products.router.js

import { Router } from "express";

const productsRouter = Router()

//VER TODOS LOS PRODUCTOS
productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const response = await req.productManager.getProducts()

        if (limit) {
            const limitedProducts = response.slice(0, limit)
            return res.json(limitedProducts)
        }

        return res.json(response)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
})

//VER PRODUCTO POR ID
productsRouter.get('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const response = await req.productManager.getProductById(id)
        res.json(response)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
})

//AGREGAR PRODUCTO
productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body;
        if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
            res.status(400).send('Error al intentar guardar producto. Envie todos los campos necesarios');
        } else {
            const response = await req.productManager.addProduct({ title, description, price, thumbnail, code, stock, status, category });
            
            // Emitir evento de Socket.IO para indicar la adición de un nuevo producto
            req.io.emit('productAdded', response);

            res.json(response);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
});

//ACTUALIZAR PRODUCTO
productsRouter.put('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body;
        const response = await req.productManager.updateProduct(id, { title, description, price, thumbnail, code, stock, status, category })
        res.json(response)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
})

//ELIMINAR PRODUCTO
productsRouter.delete('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        await req.productManager.deleteProduct(id);

        // Emitir evento de Socket.IO para indicar la eliminación de un producto
        req.io.emit('productDeleted', id);

        res.send('Producto eliminado exitosamente');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
});

export { productsRouter }
