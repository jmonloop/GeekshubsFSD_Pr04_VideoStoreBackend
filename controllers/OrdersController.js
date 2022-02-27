//Importo el modelo Pedido desestructurado (en formato objeto) para poder escribir en la tabla Pedido de la BBDD
const { Order } = require('../models/index');
//Declaro el objeto UsuariosController (siempre igual para cada controller)
const OrdersController = {};

//MÉTODO POST PARA HACER UN PEDIDO NUEVO POR BODY
OrdersController.createByBody = (req,res) => {
    //Capturo el body
    let body = req.body;

    //Creo un nuevo elemento Pedido con los datos que llegan por body
    Order.create({
        filmId: body.filmId,
        userId: body.userId,
        price: body.price,
        outDate: body.outDate,
        returnDate: body.returnDate


        // {
        //     "id": 256, 
        //     "filmId": 60599,
        //     "userId": 206,
        //     "price": 3,
        //     "outDate": "2022-02-26",
        //     "returnDate": "2022-03-10"
        // }

    })
    .then(order => {
        //Si se cumple la promesa..
        if(order){
            //Genero un mensaje
            let message = "A new order has been created with this attributes:"
            //Envío por postman el mensaje y los datos de pedido
            res.json({
                message,
                order
            })
        }else{
            res.send("Creation of new order has been failed");
        }
    })
    .catch((error => {
        res.send(error)
    }))
}

//MÉTODO POST PARA HACER UN PEDIDO NUEVO USANDO QUERY
OrdersController.createByQuery = (req,res) => {
    //Capturo las variables que llegan por query, es decir por la URL
    let filmId = req.query.filmId;
    let userId = req.query.userId;
    let price = req.query.price;
    let outDate = req.query.outDate;
    let returnDate = req.query.returnDate;

    //Creo un nuevo elemento Pedido con las variables
    Order.create({
        filmId: filmId,
        userId: userId,
        price: price,
        outDate: outDate,
        returnDate: returnDate
    })
    .then(order => {
        //Si se cumple la promesa..
        if(order){
            //Genero un mensaje
            let message = "A new order has been created with this attributes:"
            //Envío por postman el mensaje y los datos de pedido
            res.json({
                message,
                order
            })
        }else{
            res.send("Creation of new order has been failed");
        }
    })
    .catch((error => {
        res.send(error)
    }))
}

//MÉTODO GET PARA TRAER UN INFORME DE PEDIDOS POR USUARIO USANDO PARAMS
OrdersController.reportByUser = async (req,res) => {
    let user = req.params.user
    //Escribimos la consulta en formato SQL.
    let consult = 
    `SELECT orders.id AS orderNumber, orders.price AS price, users.name AS userName, users.email AS userEmail, films.title AS filmTitle, orders.outDate AS outDate
    FROM users 
    INNER JOIN orders ON users.id = orders.userId
    INNER JOIN films ON films.id = orders.filmId 
    WHERE name LIKE '%${user}%';`;

    /////////////////// EXPLICACIÓN DE LA CONSULTA SQL \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //Esta línea describe qué atributo queremos y qué nombre va a tener en el informe
    // SELECT usuarios.name AS nombre, peliculas.title AS titulo , pedidos.fechaDevolucion AS fechaDevolucion, usuarios.nickname AS nickname, usuarios.email AS correo
    
    // En esta que vamos a juntar la tabla "usuarios" (siempre empezar por una tabla master)...
    // FROM usuarios 

    //...con la tabla "pedidos" (tabla esclava) mediante estas pk/fk
    // INNER JOIN pedidos ON usuarios.id = pedidos.usuarioId

    //... y con la tabla "peliculas (la otra tabla master) mediante estas pk/fk
    // INNER JOIN peliculas ON peliculas.id = orders.peliculaId 

    //...que el atributo nombre coincida con la variable usuario
    // WHERE name LIKE '%${usuario}%' 


    //El resultado viene de una función asincrona de sequelize llamada query que sirve para realizar consultas en crudo, en vez de usar métodos propios de sequelize como el findAll o los condiciones Op.or
    let result = await Order.sequelize.query(consult,{
        //Esta línea es para que no devuelva resultados duplicados
        type: Order.sequelize.QueryTypes.SELECT});

    if(result){
        res.send(result);
    }

}

//MÉTODO GET PARA TRAER UN INFORME COMPLETO DE PEDIDOS
OrdersController.fullReport = async (req,res) => {
    //Escribimos la consulta en formato SQL.
    let consult = 
    `SELECT orders.id AS orderNumber, orders.price AS price, users.name AS userName, users.email AS userEmail, films.title AS filmTitle, orders.outDate AS outDate
    FROM users 
    INNER JOIN orders ON users.id = orders.userId
    INNER JOIN films ON films.id = orders.filmId 
    ORDER BY outDate ASC`;




    //El resultado viene de una función asincrona de sequelize llamada query que sirve para realizar consultas en crudo, en vez de usar métodos propios de sequelize como el findAll o los condiciones Op.or
    let result = await Order.sequelize.query(consult,{
        //Esta línea es para que no devuelva resultados duplicados
        type: Order.sequelize.QueryTypes.SELECT});

    if(result){
        res.send(result);
    }

}

//MÉTODO DELETE PARA BORRAR UN PEDIDO POR ID USANDO PARAMS
OrdersController.deleteById = async (req, res) => {
    let id = req.params.id

    //Busco el pedido en mi BBDD
    try {
        Order.findOne({
            where : {id : id}
            //Se resuelve la promesa de sequelize
        }).then(elmnt => {
            //Si devuelve un valor que no sea null...
            if(elmnt != null) {
                //..almaceno el valor para mostrarlo después de borrarlo
                let deletedOrder = elmnt
                //..borro el elemento de la BBDD
                Order.destroy({
                    where : { id : id },
                    truncate : false
                    //Una vez se cumple la promesa de borrarlo...
                }).then(x => {
                    //Muestro mensaje con el nombre del usuario que se ha borrado
                    res.send(`Order number ${deletedOrder.dataValues.id} has been deleted`)
                })
                //Si devuelve null quiere decir que no existen usuarios con esa id
            } else {
                res.send('There is no order with that ID in your DB')
            }
        })

    } catch (error) {
        res.send(error);
    };
}

//Exporto PedidosController para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = OrdersController;