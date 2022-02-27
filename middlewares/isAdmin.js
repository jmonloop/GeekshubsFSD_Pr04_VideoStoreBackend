//Importo ../models/index' y lo asigno al modelo Usuario
const { User } = require('../models/index');
module.exports = (req, res, next) => {
    let id = req.body.id;
    User.findOne({
        where : { id : id }
    }).then(foundUser => {
        if(foundUser.rol == "admin"){
            next();
        }else {
            res.send(`The user must be an admin`)
        }
    }).catch(error => {
        res.send(`Introduce an admin user ID`)
    })

};