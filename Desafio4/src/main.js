import express from 'express';
import http from 'http';
import handlebars from 'handlebars';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configurar handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));  // Corrección aquí
app.set('view engine', 'handlebars');

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar rutas y middleware
app.use(express.static('public'));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Configurar Socket.IO
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Manejar eventos de productos
    socket.on('productAdded', (newProduct) => {
        // Lógica para manejar un nuevo producto agregado
        // Actualizar la vista en tiempo real (emitir a los clientes)
        io.emit('updateProductList', newProduct);
    });

    socket.on('productDeleted', (deletedProductId) => {
        // Lógica para manejar la eliminación de un producto
        // Actualizar la vista en tiempo real (emitir a los clientes)
        io.emit('updateProductList', { deletedProductId });
    });
});

// Configurar Socket.IO como middleware de Express
app.use((req, res, next) => {
    req.io = io;
    req.productManager = productManager; // Agregar productManager al objeto request
    req.cartManager = cartManager; // Agregar cartManager al objeto request
    next();
});

// Iniciar servidor
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
