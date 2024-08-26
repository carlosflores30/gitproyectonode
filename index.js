const express = require('express');
const app = express();
const port = 8000; // Puerto que Render espera por defecto

app.use(express.json()); // Middleware para manejar JSON en las peticiones

// Ejemplo de ruta GET para obtener productos
app.get('/productos', (req, res) => {
    res.send('Lista de productos');
});

// Ejemplo de ruta POST para agregar un producto
app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    // Lógica para agregar producto
    res.status(201).send(`Producto añadido: ${JSON.stringify(nuevoProducto)}`);
});

// Ejemplo de ruta PUT para actualizar un producto
app.put('/productos/:id', (req, res) => {
    const productoId = req.params.id;
    const productoActualizado = req.body;
    // Lógica para actualizar producto
    res.send(`Producto con ID ${productoId} actualizado a: ${JSON.stringify(productoActualizado)}`);
});

// Ejemplo de ruta DELETE para eliminar un producto
app.delete('/productos/:id', (req, res) => {
    const productoId = req.params.id;
    // Lógica para eliminar producto
    res.send(`Producto con ID ${productoId} eliminado`);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
