
const express = require('express');
const router = express.Router();

const OrdersController = require('../controllers/OrdersController');
const isAdmin = require('../middlewares/isAdmin');

//http://localhost:3000/pedidos (usando un POST)
//Recibe por body en formato json los atributos de un pedido para añadirlo a la BBDD solo si el usuario es administrador (isAdmin)
router.post('/', isAdmin, OrdersController.createByBody);

//http://localhost:3000/pedidos?peliculaId=idDeLaPelicula&usuarioId=idDelUsuario&precio=precioDelPedido&fecchaSalida=fechaDeSalida&fechaDevolucion=fechaDeDevolución (usando un POST)
//Recibe por query en formato los atributos de un pedido para añadirlo a la BBDD
router.post('/query', OrdersController.createByQuery);

//http://localhost:3000/pedidos (usando un GET)
//Realiza una consulta SQL para mostrar un informe completo de todos los pedidos con todas los atrtibutos de película y usuario
router.get('/', OrdersController.fullReport);

//http://localhost:3000/pedidos (usando un GET)
//Realiza una consulta SQL para mostrar un informe con todos los pedidos de un usuario usando params
router.get('/:user', OrdersController.reportByUser);

//http://localhost:3000/pedidos/idPedido (usando un DELETE)
//Borra un pedido por id usando params
router.delete('/:id', OrdersController.deleteById);

//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;