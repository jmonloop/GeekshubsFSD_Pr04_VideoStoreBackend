//ROUTER.JS
//En este fichero enlazamos los ficheros de cada endpoint con su dirección en la barra de dirección (enrutar)

//Importo la clase express y ejecuto el método Router()
//sirve para rutear todo lo que se ejecute en este fichero JS
//se complementa con la última línea "module.exports = router"
//"Abro" el circuito de enrutado para este fichero JS (siempre igual)
const router = require('express').Router();



//IMPORTAMOS LOS FICHEROS JS (VIEWS) POR CADA TABLA DISEÑADA EN LA BBDD
//Importo el fichero UsuarioRouter y lo guardo en la variable UsuariosRouter. Luego habrá que crearlo.
const UsuariosRouter = require('./views/UsuariosRouter');
//Importo el fichero PeliculasRouter y lo guardo en la variable PeliculasRouter. Luego habrá que crearlo.
const PeliculasRouter = require('./views/PeliculasRouter');
//Importo el fichero PedidosRouter y lo guardo en la variable PedidosRouter. Luego habrá que crearlo.
const PedidosRouter = require('./views/PedidosRouter');

//Uso el método .use para enlazar cada dirección del endpoint con su correspondiente view (las variables que hemos creado arriba)
router.use('/usuarios', UsuariosRouter);
router.use('/peliculas', PeliculasRouter);
router.use('/pedidos', PedidosRouter);



//"Cierro" el circuito de enrutado para este fichero JS.(siempre igual)
module.exports = router;








