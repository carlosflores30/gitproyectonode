const express = require('express');
const app = express();
const port = 8000; // Render espera que tu aplicación esté en el puerto 8000

// Middleware para parsear JSON
app.use(express.json());

// Datos de ejemplo para simular una base de datos en memoria
let productos = [
  { id: 1, nombre: 'Producto A', precio: 100 },
  { id: 2, nombre: 'Producto B', precio: 200 },
];

// Ruta GET para obtener la lista de productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// Ruta POST para agregar un nuevo producto
app.post('/productos', (req, res) => {
  const nuevoProducto = req.body;
  nuevoProducto.id = productos.length + 1; // Asigna un ID único
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto); // Retorna el producto creado con status 201
});

// Ruta PUT para actualizar un producto existente
app.put('/productos/:id', (req, res) => {
  const productoId = parseInt(req.params.id, 10);
  const productoActualizado = req.body;

  // Buscar el producto por ID
  const index = productos.findIndex((prod) => prod.id === productoId);
  if (index !== -1) {
    productos[index] = { ...productos[index], ...productoActualizado }; // Actualiza el producto existente
    res.json(productos[index]); // Retorna el producto actualizado
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Ruta DELETE para eliminar un producto existente
app.delete('/productos/:id', (req, res) => {
  const productoId = parseInt(req.params.id, 10);
  const index = productos.findIndex((prod) => prod.id === productoId);

  if (index !== -1) {
    const productoEliminado = productos.splice(index, 1); // Elimina el producto del array
    res.json(productoEliminado); // Retorna el producto eliminado
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
