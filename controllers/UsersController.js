//Importo el modelo Usuario desestructurado (en formato objeto) para poder escribir en la tabla Usuario de la BBDD
const { User } = require('../models/index');
//Importo el operador de sequelize para poder hacer consultas a la BBDD con condicionales
const { Op } = require("sequelize");
//Importo la clase bcrypt para poder encriptar
const bcrypt = require('bcrypt');
//Importo el fichero ../config/auth.js para poder darle los parámetros al encriptado
const authConfig = require('../config/auth');
//Importo la clase jsonwebtoken para generar un token al hacer login
const jwt = require('jsonwebtoken');
//Declaro el objeto UsuariosController (siempre igual para cada controller)
const UsersController = {};




//Lógica de cada función.
//Si alguien luego quisiera coger estos datos de nuestra API (un front u otra API externa) tendrá que:
//let resultado= await axios.get(http://localhost3000/usuarios) y recibiremos en este caso lo que en la función traeUsuarios nos devuelva por res.
    //req --> What front REQuests to the back
    //res--> What back RESponses to the front
    UsersController.getUsers = (req, res) => {
    //Ejecutamos el método de sequelize findAll() para la tabla Usuario
    User.findAll()
    .then(data => { //data es el callback que devuelve el método findAll si encuentra lo que hay dentro del argumento (en este caso como busca todos no hay nada)

        res.send(data) //.send se usa para enviarlo de vuelta y mostrarlo
    });
};

//En este caso es un método post que lo que hace es escribir desde el body de Postman (pero sin guardarlo en la BBDD).
UsersController.writeRaw = async (req, res) => {
    //Es decir lo que escribamos en el body de postman (simulando que viene del front)...
    //IMPORTANTE: en postman decirle que el texto está en formato JSON.
    //IMPORTANTE: si vamos a enviar un objeto de JS, las key DEBEN ser strings.
    //Por tanto quieremos meter un objeto de JavaScript antes debemos hacerle JSON.stringify() para pasarlo todo a string de JSON.
    let body = req.body;

    try {
        //...y también por postman
        res.send(body);

    } catch (error) {

        res.send(error);
    }; 
};

//MÉTODO POST PARA ESCRIBIR EN LA BASE DE DATOS
UsersController.userRegister = async (req, res) => {
    
    //Declaramos variables para recoger los datos que llegarán por body en formato json.
    //el nombre de la variable por convención suele ser el mismo que tiene cada atributo (columna) en la tabla Usuario de mySQL
    let name = req.body.name; //lo que va después de "body" (".name" en este caso) es como se llama cada key que recibe desde body
    let surname = req.body.surname;
    let age = req.body.age;
    let email = req.body.email;
    let nickname = req.body.nickname;
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds)); //Encriptamos el campo password antes de guardarlo en la BBDD
    let rol = req.body.rol;
    
    //Para estas variables luego haremos post desde Postman con este json en el body:
    // {
    //     "name":"Javi",
    //     "surname":"Monleón",
    //     "age":32,
    //     "email": "falso@gmail.com",
    //     "nickname":"jmonloop",
    //     "password":"1234",
    //     "rol":"admin"
    // }

    //Comprobación de errores.....
    //Aquí haríamos console.logs en caso de fallo
    //Guardamos en sequelize el usuario


    //Antes de registrar el usuario comprobamos si ya existe en la BBDD haciendo findAll con email o nickname
    User.findAll({
        where : { //where es donde asignamos el atributo de la BBDD con la key que le entra por body en formato json

            [Op.or] : [ //usamos operador OR
                {
                    email : { //si el atributo email de la tabla Usuario..
                        [Op.like] : email //..es igual que la key email que le entra por body en formato json
                    }
                },
                //ó
                {
                    nickname : { //si el atributo nickname de la tabla Usuario..
                        [Op.like] : nickname//..es igual que la key nickname que le entra por body en formato json
                    }
                }
            ]

        }

    }).then(repeatedData => { //Si findAll() encuentra alguno de los dos...
            //..compara el callback con 0, lo cual quiere decir que no existe ninguno en la BBDD..
            if(repeatedData == 0){
                //..por tanto permite ejecutar el método de sequelize ".create()" para añadir un elemento nuevo a la BBDD
                User.create({
                    name: name, //asignamos a cada atributo de la tabla, su correspondiente variable con la key que viene del body
                    surname: surname,
                    age: age,
                    email: email,
                    nickname: nickname,
                    password: password,
                    rol: rol

                    //Si el usuario se ha almacenado correctamente, enviamos al front un texto confirmándolo
                }).then(user => {
                    res.send(`${user.dataValues.name}, you have been registered satisfactorily`);

                }).catch((error) => {
                    res.send(error);
                });
                
                //Si el callback no es igual a 0 quiere decir que ya existía, y por tanto en vez de hacer Usuario.create(), envía un texto al front
            }else {
                res.send("The user with that email/nickname already figures in the database");
            }

    }).catch(error => {
        res.send(error)
    });
};


//Método post para loguearse metiendo los datos por body y generar un token nuevo en caso de login satisfactorio.
//El usuario debe estar registrado en la BBDD con un email y password válidos
UsersController.login = (req, res) => {
    let email = req.body.email;    // Cogemos el email del body
    let password = req.body.password; //cogemos el password del body
    User.findOne({                   //Buscamos el email para verificar que ese usuario está registrado en nuestra BBDD
        where : {email : email} //Si el atributo email coincide con el campo email del body...
        
    }).then(elmnt => {            //(callback del método findOne que en este caso es lo que haya encontrado)
        if(!elmnt){                //..si no existe en nuestra BBDD...
            res.send("Invalid email or password");    //..muestra mensaje de que el login es inválido
        }else {                        //Si sí que existe..
            if (bcrypt.compareSync(password, elmnt.password)) { //Compara contraseña que le manda el body con la que tiene guardada ese usuario en la BBDD (desencriptándola)
                let token = jwt.sign({ user: elmnt }, authConfig.secret, { //Si son iguales, genera un token
                    expiresIn: authConfig.expires //que expira en un tiempo determinado según lo que haya en ../config/auth
                });
                //Mensaje de confirmación de login satisfactorio
                let loginOKmessage = `Welcome again ${elmnt.dataValues.name}`
                res.json({   // y envía por Postman...
                    loginOKmessage, //el mensaje
                    user: elmnt, //el usuario
                    token: token //y el token generado
                })
            } else {
                res.status(401).json({ msg: "Invalid email or password" }); //si no son iguales, login inválido
            }
        };
    }).catch(error => {
        res.send(error);    //catch para pillar el error
    })
};


//Para enviar cosas a la BBDD para hacer consultas, podemos enviarlos directamente por la URL (ver req.query y req.params) utilizando GET.
//Más info: https://stackoverflow.com/questions/14417592/node-js-difference-between-req-query-and-req-params
//req.params --> meter una variable al final de una URL
    //www.finaldelendpoint.com/var1
//req.query --> meter claves valor al final de una URL:
    //www.finaldelendpoint.com/?clave1=valor1&clave2=valor2
//Este método solo se usa para datos que no son sensibles ya que cualquiera los puede ver solo leyendo el tráfico de la web.

//Si queremos enviar datos sensibles, SIEMPRE debemos usar el body.

//METODO POST PARA MOSTRAR USUARIO POR EMAIL DESDE LA URL
//Aquí hacemos una búsqueda por email. El email lo metemos por Postman + Params o directamente al final del endpoint
UsersController.getUserByEmail = (req, res) => {
    //Usamos el método de sequelize .findOne() para mostrar un elemento que coincida
    let email = req.params.email
    User.findOne({ where : { email : email }}) //donde el atributo email nos entra por la dirección URL (params)

    //si lo encuentra, lo muestra
    .then(data => {
        if(data != null) {
            res.send(data)
        } else {
            res.send(`${email} not found in the database. Add a valid email direction to the URL for getting its user profile`)
        }
    });
}

//MÉTODO GET PARA SACAR UN ELEMENTO DE LA BBDD BUSCÁNDOLO POR NICKNAME EN LA URL
UsersController.getUserByNickname = (req, res) => {
    let nickname = req.params.nickname
    //Búsqueda comparando un campo
    User.findOne({ where : { nickname : nickname }}) //El primer nickname hace referencia al nombre del atributo en mySQL. El último nickname hace referencia a la variable que hemos puesto en el endpoint (puesto en UsuarioRouter)
    .then(elmnt => {
        if(elmnt != null) {
            res.send(elmnt)
        } else {
            res.send(`The nickname ${nickname} does not figures in the database`)
        }
    });
}

//MÉTODO DELETE PARA BORRAR TODOS LOS USUARIOS DE LA BBDD
UsersController.deleteAll = async (req, res) => {
    try {
        User.destroy({
            where : {}, //No se especifica ningún elemento ya que queremos borrarlos todos
            truncate : false //Resetea todas las pk
        }).then(elmnt =>{
            res.send(`${elmnt} users have been deleted`);
        });
    } catch (error) {
        res.send(error);
    };
};

//MÉTODO DELETE PARA BORRAR UN USUARIO DE LA BBDD POR ID
UsersController.deleteById = async (req, res) => {
    //Busco el usuario en mi BBDD
    try {
        let id = req.params.id
        User.findOne({
            where : {id : id}
            //Se resuelve la promesa de sequelize
        }).then(elmnt => {
            //Si devuelve un valor que no sea null...
            if(elmnt != null) {
                //..almaceno el valor para mostrarlo después de borrarlo
                let deletedUser = elmnt
                //..borro el elemento de la BBDD
                User.destroy({
                    where : { id : req.params.id },
                    truncate : false
                    //Una vez se cumple la promesa de borrarlo...
                }).then(x => {
                    //Muestro mensaje con el nombre del usuario que se ha borrado
                    res.send(`${deletedUser.dataValues.name} has been deleted`)
                })
                //Si devuelve null quiere decir que no existen usuarios con esa id
            } else {
                res.send('There is no user with that ID in your database')
            }
        })

    } catch (error) {
        res.send(error);
    };
};

//MÉTODO PUT PARA MODIFICAR EL PERFIL DE UN USUARIO POR ID
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

        //    {
    //         "name":"JaviMOD",
    //         "surname":"MonleónMOD",
    //         "age":32,
    //     }
}

//MÉTODO PUT PARA QUE UN USUARIO MODIFIQUE SU PASSWORD
UsersController.updatePassword = (req,res) => {
    //Capturo el id que entra por body
    let id = req.body.id;
    //Capturo el password viejo que entra por body
    let oldPassword = req.body.oldPassword;
    //Capturo el nuevo password que entra por body
    let newPassword = req.body.newPassword;

    //Busca el usuario
    User.findOne({
        //donde su id coincida con la id que llega por body
        where : { id : id}
    }).then(foundUser => {
        //Si lo encuentra...
        if(foundUser){
            //..y si el password antiguo coincide con el de la BBDD...
            if (bcrypt.compareSync(oldPassword, foundUser.password)) {

                //1er paso..encriptamos el nuevo password....
                newPassword = bcrypt.hashSync(newPassword, Number.parseInt(authConfig.rounds)); 

                //2do paso: asignamos el atributo password de la BBDD al newPassword que nos llegó por body. Esto lo guardamos en un json llamado data
                let data = {
                    password: newPassword
                }

                //hacemos update, es decir ejecutamos el 2do paso
                User.update(data, {
                    //para el usuario con id que coincida con el que nos llega por body
                    where: {id : id}
                })
                .then(actualizado => {
                    //y enviamos confirmación por Postman
                    res.send('Your password has been updated');
                })
                .catch((error) => {
                    res.status(401).json({ msg: `There has been an error updating your password`});
                });
                //si el password antiguo es incorrecto da fallo
            }else{
                res.status(401).json({ msg: "Invalid id or password" });
            }

            //si no encuentra el usuario da fallo
        }else{
            res.send(`User not found`);
        }

    }).catch((error => {
        res.send(error);
    }));

};

//Recibo por body en formato json los datos de usuario de mi BBDD buscándolo por un término usando params
UsersController.searchByTerm = async (req, res) => {
    let arg = req.params.arg

    //declaro el string que forma la consulta de SQL
    let consult = 
    `SELECT * FROM videoclub.users
    WHERE name LIKE '%${arg}%'
    OR surname LIKE '%${arg}%'
    OR age LIKE '%${arg}%'
    OR email LIKE '%${arg}%'
    OR nickname LIKE '%${arg}%'
    OR rol LIKE '%${arg}%'`;

    //genero el método de sequelize para hacer a consulta SQL en crudo
    let result = await User.sequelize.query(consult,{
    //Esta línea es para que no devuelva resultados duplicados
    type: User.sequelize.QueryTypes.SELECT});

    //Si la consulta devuelve algún resultado..
    if(result != 0){
        //..muestro los resultados obtenidos
        res.send(result)
    }else {
        res.send(`The term ${arg} is not present at your users database`)
    }
};






//Exporto UsuariosController para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = UsersController;