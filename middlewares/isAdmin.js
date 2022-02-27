//Importo ../models/index' y lo asigno al modelo Usuario
const { User } = require('../models/index');

//Exporto la función middleware
module.exports = (req, res, next) => {
    //Capturo la id de usuario que nos llega por body
    let id = req.body.id;

    //Busco en la tabla Usuario..
    User.findOne({
        //..un usuario con esa id
        where : { id : id }
        //Si lo encuentro..
    }).then(foundUser => {
        //..y su rol es admin...
        if(foundUser.rol == "admin"){
            //..finaliza el middleware y continuará ejecutando el endpoint donde lo pongamos
            next();
            //Si no es admin solo mostrará un mensaje y ese endpoint no se ejecuta
        }else {
            res.send(`The user must be an admin`)
        }
    }).catch(error => {
        res.send(`Introduce an admin user ID`)
    })

};