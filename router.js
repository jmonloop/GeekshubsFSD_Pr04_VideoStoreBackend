//ROUTER.JS
//En este fichero enlazamos los ficheros de cada endpoint con su dirección en la barra de dirección (enrutar)

//Importo la clase express y ejecuto el método Router() (siempre igual)
const router = require('express').Router();



//IMPORTAMOS LOS FICHEROS JS (VIEWS) POR CADA TABLA DISEÑADA EN LA BBDD
//Importo el fichero UsuarioRouter y lo guardo en la variable UsuariosRouter. Luego habrá que crearlo.
const UsersRouter = require('./views/UsersRouter');
//Importo el fichero PeliculasRouter y lo guardo en la variable PeliculasRouter. Luego habrá que crearlo.
const FilmsRouter = require('./views/FilmsRouter');
//Importo el fichero PedidosRouter y lo guardo en la variable PedidosRouter. Luego habrá que crearlo.
const OrdersRouter = require('./views/OrdersRouter');

//Uso el método .use para enlazar cada dirección del endpoint con su correspondiente view (las variables que hemos creado arriba)
router.use('/users', UsersRouter);
router.use('/films', FilmsRouter);
router.use('/orders', OrdersRouter);



//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;








