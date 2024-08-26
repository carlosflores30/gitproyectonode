const express = require('express');
const app = express();
const PORT = 8000; // O el puerto que utilices

// Middleware para analizar JSON
app.use(express.json());

// Ejemplo de productos (normalmente obtendrías estos datos de una base de datos)
let productos = [
  { id: 1, nombre: "Producto A", precio: 100 },
  { id: 2, nombre: "Producto B", precio: 200 },
];

// Ruta GET para obtener todos los productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// Ruta POST para agregar un nuevo producto
app.post('/productos', (req, res) => {
  const nuevoProducto = { id: productos.length + 1, ...req.body };
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

// Ruta PUT para actualizar un producto existente
app.put('/productos/:id', (req, res) => {
  const { id } = req.params;
  const index = productos.findIndex(producto => producto.id == id);
  
  if (index !== -1) {
    productos[index] = { ...productos[index], ...req.body };
    res.json(productos[index]);
  } else {
    res.status(404).send({ message: "Producto no encontrado" });
  }
});

// Ruta DELETE para eliminar un producto existente
app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;
  const index = productos.findIndex(producto => producto.id == id);

  if (index !== -1) {
    const productoEliminado = productos.splice(index, 1);
    res.json(productoEliminado);
  } else {
    res.status(404).send({ message: "Producto no encontrado" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
