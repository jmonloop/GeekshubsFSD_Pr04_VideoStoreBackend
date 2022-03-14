//Imports
const { Order } = require('../models/index');

//OrdersController object declaration
const OrdersController = {};

//Controller Functions
OrdersController.createByBody = (req, res) => {
    let body = req.body;
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
            if (order) {
                let message = "A new order has been created with this attributes:"
                res.json({
                    message,
                    order
                })
            } else {
                res.send("Creation of new order has been failed");
            }
        })
        .catch((error => {
            res.send(error)
        }))
}
OrdersController.createByQuery = (req, res) => {
    let filmId = req.query.filmId;
    let userId = req.query.userId;
    let price = req.query.price;
    let outDate = req.query.outDate;
    let returnDate = req.query.returnDate;
    Order.create({
        filmId: filmId,
        userId: userId,
        price: price,
        outDate: outDate,
        returnDate: returnDate
    })
        .then(order => {
            if (order) {
                let message = "A new order has been created with this attributes:"
                res.json({
                    message,
                    order
                })
            } else {
                res.send("Creation of new order has been failed");
            }
        })
        .catch((error => {
            res.send(error)
        }))
}
OrdersController.findUserMovies = async (req, res) => {
    let userId = req.query.user;
    let filmId = req.query.film;

    let consult = `SELECT * FROM orders
        WHERE (filmId = ${filmId} AND userId = ${userId})`;

    let result = await Order.sequelize.query(consult, {
        type: Order.sequelize.QueryTypes.SELECT
    });

    if (result) {
        res.send(result);
    }
}
OrdersController.reportByUserId = async (req, res) => {
    let id = req.params.id
    let consult =
        `SELECT orders.id AS orderNumber, orders.price AS price, users.name AS userName, users.email AS userEmail, films.title AS filmTitle, orders.outDate AS outDate
    FROM users 
    INNER JOIN orders ON users.id = orders.userId
    INNER JOIN films ON films.id = orders.filmId 
    WHERE userId LIKE ${id};`;
    let result = await Order.sequelize.query(consult, {
        type: Order.sequelize.QueryTypes.SELECT
    });


    if (result != 0) {
        res.send(result);
    } else {
        res.send('There are no fields with the searched term')
    }


}
OrdersController.fullReport = async (req, res) => {
    let consult =
        `SELECT orders.id AS orderNumber, orders.price AS price, users.name AS userName, users.email AS userEmail, films.title AS filmTitle, orders.outDate AS outDate
    FROM users 
    INNER JOIN orders ON users.id = orders.userId
    INNER JOIN films ON films.id = orders.filmId 
    ORDER BY outDate ASC`;
    let result = await Order.sequelize.query(consult, {
        type: Order.sequelize.QueryTypes.SELECT
    });

    if (result) {
        res.send(result);
    }

}
OrdersController.deleteById = async (req, res) => {
    let id = req.params.id
    try {
        Order.findOne({
            where: { id: id }
        }).then(elmnt => {
            if (elmnt != null) {
                let deletedOrder = elmnt
                Order.destroy({
                    where: { id: id },
                    truncate: false
                }).then(x => {
                    res.send(`Order number ${deletedOrder.dataValues.id} has been deleted`)
                })
            } else {
                res.send('There is no order with that ID in your DB')
            }
        })

    } catch (error) {
        res.send(error);
    };
}

//Export
module.exports = OrdersController;