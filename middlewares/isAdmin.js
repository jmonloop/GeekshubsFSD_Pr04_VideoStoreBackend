//Imports
const { User } = require('../models/index');

//Export logic
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