//Declaro el modelo Usuario para poder escribir en la tabla Usuario de la BBDD
const { Usuario } = require('../models/index');
//Importo el operador de sequelize para poder hacer consultas a la BBDD con condicionales
const { Op } = require("sequelize");
//Importo la clase bcrypt para poder encriptar
const bcrypt = require('bcrypt');
//Importo el fichero ../config/auth.js para poder darle los parámetros al encriptado
const authConfig = require('../config/auth');
//Importo la clase jsonwebtoken para generar un token al hacer login
const jwt = require('jsonwebtoken');

//Declaro el objeto UsuariosController (siempre igual para cada controller)
const UsuariosController = {};

//Lógica de cada función.
//Si alguien luego quisiera coger estos datos de nuestra API (un front u otra API externa) tendrá que:
//let resultado= await axios.get(http://localhost3000/usuarios) y recibiremos en este caso lo que en la función traeUsuarios nos devuelva por res.
    //req --> What front REQuests to the back
    //res--> What back RESponses to the front
UsuariosController.traeUsuarios = (req, res) => {
    //Ejecutamos el método de sequelize findAll() para la tabla Usuario
    Usuario.findAll()
    .then(data => { //data es el callback que devuelve el método findAll si encuentra lo que hay dentro del argumento (en este caso como busca todos no hay nada)

        res.send(data) //.send se usa para enviarlo de vuelta y mostrarlo
    });
};


//En este caso es un método post que lo que hace es escribir desde el body de Postman (pero sin guardarlo en la BBDD).
UsuariosController.escribeEnCrudo = async (req, res) => {
    //Es decir lo que escribamos en el body de postman (simulando que viene del front)...
    //IMPORTANTE: en postman decirle que el texto está en formato JSON.
    //IMPORTANTE: si vamos a enviar un objeto de JS, las key DEBEN ser strings.
    //Por tanto quieremos meter un objeto de JavaScript antes debemos hacerle JSON.stringify() para pasarlo todo a string de JSON.
    let cuerpo = req.body;
    //...nos lo imprime por console.log...
    console.log(cuerpo);

    try {
        //...y también por postman
        res.send(cuerpo);

    } catch (error) {

        res.send(error);
    }; 
};



//MÉTODO POST PARA ESCRIBIR EN LA BASE DE DATOS
UsuariosController.registraUsuario = async (req, res) => {
    
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
    Usuario.findAll({
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

    }).then(datosRepetidos => { //Si findAll() encuentra alguno de los dos...
            //..compara el callback con 0, lo cual quiere decir que no existe ninguno en la BBDD..
            if(datosRepetidos == 0){
                //..por tanto permite ejecutar el método de sequelize ".create()" para añadir un elemento nuevo a la BBDD
                Usuario.create({
                    name: name, //asignamos a cada atributo de la tabla, su correspondiente variable con la key que viene del body
                    surname: surname,
                    age: age,
                    email: email,
                    nickname: nickname,
                    password: password,
                    rol: rol

                    //Si el usuario se ha almacenado correctamente, enviamos al front un texto confirmándolo
                }).then(usuario => {
                    res.send(`${usuario.dataValues.name}, te has registrado correctamente`);

                }).catch((error) => {
                    res.send(error);
                });
                
                //Si el callback no es igual a 0 quiere decir que ya existía, y por tanto en vez de hacer Usuario.create(), envía un texto al front
            }else {
                res.send("El usuario con ese e-mail y/o nickname ya existe en nuestra base de datos");
            }

    }).catch(error => {
        res.send(error)
    });
};



//Método post para loguearse metiendo los datos por body y generar un token nuevo en caso de login satisfactorio.
//El usuario debe estar registrado en la BBDD con un email y password válidos
UsuariosController.login = (req, res) => {
    let email = req.body.email;    // Cogemos el email del body
    let password = req.body.password; //cogemos el password del body
    Usuario.findOne({                   //Buscamos el email para verificar que ese usuario está registrado en nuestra BBDD
        where : {email : email} //Si el atributo email coincide con el campo email del body...
        
    }).then(elmnt => {            //(callback del método findOne que en este caso es lo que haya encontrado)
        if(!elmnt){                //..si no existe en nuestra BBDD...
            res.send("Usuario o contraseña inválido");    //..muestra mensaje de que el login es inválido
        }else {                        //Si sí que existe..
            if (bcrypt.compareSync(password, elmnt.password)) { //Compara contraseña que le manda el body con la que tiene guardada ese usuario en la BBDD (desencriptándola)
                let token = jwt.sign({ usuario: elmnt }, authConfig.secret, { //Si son iguales, genera un token
                    expiresIn: authConfig.expires //que expira en un tiempo determinado según lo que haya en ../config/auth
                });
                //Mensaje de confirmación de login satisfactorio
                let mensajeLoginOk = `Bienvenid@ de nuevo ${elmnt.dataValues.name}`
                res.json({   // y envía por Postman...
                    usuario: elmnt, //el usuario
                    token: token, // el token generado
                    mensajeLoginOk //y el mensaje
                })
            } else {
                res.status(401).json({ msg: "Usuario o contraseña inválidos" }); //si no son iguales, login inválido
            }
        };
    }).catch(error => {
        res.send(error);    //catch para pillar el error
    })
};



//Para enviar cosas a la BBDD para hacer consultas, podemos enviarlos directamente por la URL (ver req.query y req.params) utilizando GET.
//Más info: https://stackoverflow.com/questions/14417592/node-js-difference-between-req-query-and-req-params
//Este método solo se usa para datos que no son sensibles ya que cualquiera los puede ver solo leyendo el tráfico de la web.

//Si queremos enviar muchos datos, o datos sensibles, SIEMPRE debemos usar el body.

//METODO POST PARA MOSTRAR USUARIO POR EMAIL DESDE LA URL
//Aquí hacemos una búsqueda por email. El email lo metemos por Postman + Params o directamente al final del endpoint
UsuariosController.traerUsuarioEmail = (req, res) => {
    //Usamos el método de sequelize .findOne() para mostrar un elemento que coincida
    Usuario.findOne({ where : { email : req.params.email }}) //donde el atributo email nos entra por la dirección URL (params)

    //si lo encuentra, lo muestra
    .then(data => {
        res.send(data)
    });
}


//MÉTODO GET PARA SACAR UN ELEMENTO DE LA BBDD BUSCÁNDOLO POR NICKNAME EN LA URL
UsuariosController.userProfile = (req, res) => {
    //Búsqueda comparando un campo
    Usuario.findOne({ where : { nickname : req.params.nickname }}) //El primer nickname hace referencia al nombre del atributo en mySQL. El último nickname hace referencia a la variable que hemos puesto en el endpoint (puesto en UsuarioRouter)
    .then(elmnt => {
        res.send(elmnt)
    });
}





//MÉTODO DELETE PARA BORRAR TODOS LOS USUARIOS DE LA BBDD
UsuariosController.borrarTodos = async (req, res) => {
    console.log('entra')
    try {
        Usuario.destroy({
            where : {}, //No se especifica ningún elemento ya que queremos borrarlos todos
            truncate : false //Resetea todas las pk
        }).then(elmnt =>{
            res.send(`Se han eliminado ${elmnt} usuarios`);
        });
    } catch (error) {
        res.send(error);
    };
};



//MÉTODO DELETE PARA BORRAR UN USUARIO DE LA BBDD POR ID
UsuariosController.borrarPorId = async (req, res) => {
    try {
        Usuario.destroy({
            where : { id : req.params.id }, //Ahora le decimos que enlace el id que le metemos en la URL con el atributo id de la tabla. Para borrar solo ese usuario
            truncate : false,
            // restartIdentity: true
        }).then(elmnt =>{
            res.send(`Se ha eliminado el usuario`);
        });
    } catch (error) {
        res.send(error);
    };
};


//MÉTODO PUT PARA MODIFICAR EL PERFIL DE UN USUARIO POR ID
UsuariosController.modificarUsuario = async (req, res) => {
    let id = req.params.id;
    try {
        Usuario.update(req.body, {
            where : {id : id}
        })
        .then(elmnt => {
            res.send(`El usuario con id nº ${id} ha sido modificado`)
        })
    } catch (error) {
        res.send(error);
    }
}
//Con esta función modificamos los datos
    //    {
    //         "name":"JaviMOD",
    //         "surname":"MonleónMOD",
    //         "age":32,
    //     }












//"Cierro" el circuito de enrutado para este fichero JS.(siempre igual)
module.exports = UsuariosController;