
const express = require('express');
const router = express.Router();

const PedidosController = require('../controllers/PedidosController');
const isAdmin = require('../middlewares/isAdmin');

//http://localhost:3000/pedidos (usando un POST)
//Recibe por body en formato json los atributos de un pedido para añadirlo a la BBDD solo si el usuario es administrador (isAdmin)
router.post('/', isAdmin, PedidosController.hacerNuevoPedido);


//http://localhost:3000/pedidos (usando un GET)
//Realiza una consulta SQL para mostrar un informe con todos los pedidos con ciertos parámetros solo si el usuario es administrador (isAdmin)
router.get('/', PedidosController.mostrarPedidos);

//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;