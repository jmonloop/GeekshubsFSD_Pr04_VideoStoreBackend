//Importo el modelo Pedido desestructurado (en formato objeto) para poder escribir en la tabla Pedido de la BBDD
const { Pedido } = require('../models/index');
//Declaro el objeto UsuariosController (siempre igual para cada controller)
const PedidosController = {};

//MÉTODO POST PARA HACER UN PEDIDO NUEVO
PedidosController.hacerNuevoPedido = (req,res) => {
    //Capturo el body
    let body = req.body;

    //Creo un nuevo elemento Order con los datos que llegan por
    Order.create({
        price: body.price,
        peliculaId: body.peliculaId,
        usuarioId: body.usuarioId,
        fecha: body.fecha
    })
    .then(pedido => {
        if(pedido){
            //Muestro el pedido por Postman
            res.send(pedido)
        }else{
            res.send("La creación de un nuevo pedido ha fallado");
        }
    })
    .catch((error => {
        res.send(error)
    }))
}


//MÉTODO GET PARA TRAER TODOS LOS PEDIDOS (CONSULTA O INFORME SQL)
PedidosController.mostrarPedidos = async (req,res) => {
    //Escribimos la consulta en formato SQL.
    let consulta = 
    `SELECT usuarios.name AS nombre, peliculas.titulo AS titulo , peliculas.popularity AS top_rated, usuarios.nickname AS Nick, usuarios.email AS correo
    FROM usuarios 
    INNER JOIN orders ON usuarios.id = orders.usuarioId
    INNER JOIN peliculas ON peliculas.id = orders.peliculaId 
    WHERE popularity > 6 
    AND name LIKE '%Ra%' 
    ORDER BY top_rated DESC`; 

    /////////////////// EXPLICACIÓN DE LA CONSULTA SQL \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //Esta línea describe qué atributo queremos y qué nombre va a tener en el informe
    // SELECT usuarios.name AS nombre, peliculas.titulo AS titulo , peliculas.popularity AS top_rated, usuarios.nickname AS Nick, usuarios.email AS correo
    
    // En esta que vamos a juntar la tabla "usuarios" (siempre empezar por una tabla master)...
    // FROM usuarios 

    //...con la tabla "orders" (tabla esclava) mediante estas pk/fk
    // INNER JOIN orders ON usuarios.id = orders.usuarioId

    //... y con la tabla "peliculas (la otra tabla master) mediante estas pk/fk
    // INNER JOIN peliculas ON peliculas.id = orders.peliculaId 

    //...que el atributo de popularidad sea mayor que 6
    // WHERE popularity > 6 

    //y que el atributo de nombre empiece por 'Ra'
    // AND name LIKE '%Ra%' 

    //y que esté ordenado de mayor a menor (por nombre)
    // ORDER BY top_rated DESC;



    //El resultado viene de una función asincrona de sequelize llamada query que sirve para realizar consultas en crudo, en vez de usar métodos propios de sequelize como el findAll o los condiciones Op.or
    let resultado = await Order.sequelize.query(consulta,{
        //Esta línea es para que no devuelva resultados duplicados
        type: Order.sequelize.QueryTypes.SELECT});

    if(resultado){
        res.send(resultado);
    }

}

//Exporto PedidosController para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = PedidosController;