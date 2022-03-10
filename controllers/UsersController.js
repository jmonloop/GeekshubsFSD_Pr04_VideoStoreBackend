//Imports
const { User } = require('../models/index');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');

//UserController object declaration
const UsersController = {};


//Controller Functions
UsersController.getUsers = (req, res) => {
User.findAll()
.then(data => {

    res.send(data)
});
};
UsersController.writeRaw = async (req, res) => {
    let body = req.body;

    try {
        res.send(body);

    } catch (error) {

        res.send(error);
    }; 
};
UsersController.userRegister = async (req, res) => {
    let name = req.body.name;
    let surname = req.body.surname;
    let age = req.body.age;
    let email = req.body.email;
    let nickname = req.body.nickname;
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    let rol = req.body.rol;
    // {
    //     "name":"Javi",
    //     "surname":"Monleón",
    //     "age":32,
    //     "email": "falso@gmail.com",
    //     "nickname":"jmonloop",
    //     "password":"1234",
    //     "rol":"admin"
    // }
    User.findAll({
        where : {

            [Op.or] : [
                {
                    email : {
                        [Op.like] : email
                    }
                },
                {
                    nickname : {
                        [Op.like] : nickname//..es igual que la key nickname que le entra por body en formato json
                    }
                }
            ]

        }

    }).then(repeatedData => {
            if(repeatedData == 0){
                User.create({
                    name: name,
                    surname: surname,
                    age: age,
                    email: email,
                    nickname: nickname,
                    password: password,
                    rol: rol
                }).then(user => {
                    res.send(`${user.dataValues.name}, you have been registered succesfully`);

                }).catch((error) => {
                    res.send(error);
                });
            }else {
                res.send("The user with that email/nickname already figures in the database");
            }

    }).catch(error => {
        res.send(error)
    });
};
UsersController.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({
        where : {email : email}
        
    }).then(elmnt => {
        if(!elmnt){
            res.send("Invalid email or password");
        }else {
            if (bcrypt.compareSync(password, elmnt.password)) {
                let token = jwt.sign({ user: elmnt }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });
                let loginOKmessage = `Welcome again ${elmnt.dataValues.name}`
                res.json({
                    loginOKmessage,
                    user: elmnt,
                    token: token
                })
            } else {
                res.send("Invalid email or password" );
            }
        };
    }).catch(error => {
        res.send(error);
    })
};
UsersController.getUserByEmail = (req, res) => {
    let email = req.params.email
    User.findOne({ where : { email : email }})
    .then(data => {
        if(data != null) {
            res.send(data)
        } else {
            res.send(`${email} not found in the database. Add a valid email direction to the URL for getting its user profile`)
        }
    });
}
UsersController.getUserByNickname = (req, res) => {
    let nickname = req.params.nickname
    User.findOne({ where : { nickname : nickname }})
    .then(elmnt => {
        if(elmnt != null) {
            res.send(elmnt)
        } else {
            res.send(`The nickname ${nickname} does not figures in the database`)
        }
    });
}
UsersController.deleteAll = async (req, res) => {
    try {
        User.destroy({
            where : {},
            truncate : false
        }).then(elmnt =>{
            res.send(`${elmnt} users have been deleted`);
        });
    } catch (error) {
        res.send(error);
    };
};
UsersController.deleteById = async (req, res) => {
    try {
        let id = req.params.id
        User.findOne({
            where : {id : id}
        }).then(elmnt => {
            if(elmnt != null) {
                let deletedUser = elmnt
                User.destroy({
                    where : { id : req.params.id },
                    truncate : false
                }).then(x => {
                    res.send(`${deletedUser.dataValues.name} has been deleted`)
                })
            } else {
                res.send('There is no user with that ID in your database')
            }
        })

    } catch (error) {
        res.send(error);
    };
};
UsersController.modifyUser = async (req, res) => {
    let id = req.params.id;
    try {
        User.update(req.body, {
            where : {id : id}
        })
        .then(elmnt => {
            res.send(`The user profile with the id number ${id} has been modified`)
        })
    } catch (error) {
        res.send(error);
    }
}
UsersController.updatePassword = (req,res) => {
    let id = req.body.id;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    User.findOne({
        where : { id : id}
    }).then(foundUser => {
        if(foundUser){
            if (bcrypt.compareSync(oldPassword, foundUser.password)) {
                newPassword = bcrypt.hashSync(newPassword, Number.parseInt(authConfig.rounds));
                let data = {
                    password: newPassword
                }
                User.update(data, {
                    where: {id : id}
                })
                .then(actualizado => {
                    res.send('Your password has been updated');
                })
                .catch((error) => {
                    res.status(401).json({ msg: `There has been an error updating your password`});
                });
            }else{
                res.status(401).json({ msg: "Invalid id or password" });
            }
        }else{
            res.send(`User not found`);
        }

    }).catch((error => {
        res.send(error);
    }));

};
UsersController.searchByTerm = async (req, res) => {
    let arg = req.params.arg
    let consult = 
    `SELECT * FROM users
    WHERE name LIKE '%${arg}%'
    OR surname LIKE '%${arg}%'
    OR age LIKE '%${arg}%'
    OR email LIKE '%${arg}%'
    OR nickname LIKE '%${arg}%'
    OR rol LIKE '%${arg}%'`;
    let result = await User.sequelize.query(consult,{
    type: User.sequelize.QueryTypes.SELECT});
    if(result != 0){
        res.send(result)
    }else {
        res.send(`The term ${arg} is not present at your users database`)
    }
};

//Export
module.exports = UsersController;