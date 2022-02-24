//Importo la clase axios para poder hacer llamadas a otros endpoints
const axios = require("axios");
//Importo el modelo Pelicula desestructurado (en formato objeto) para poder escribir en la tabla Pelicula de la BBDD
const { Pelicula } = require('../models/index');
//Importo el operador de sequelize para poder hacer consultas a la BBDD con condicionales
const { Op } = require("sequelize");
//Importo compareSync desestructurado usando la clase bcrypt para poder comparar variables encriptadas
const { compareSync } = require("bcrypt");
//Declaro la API_KEY necesaria para ejecutar endpoints en TMDB
const API_KEY = "210d6a5dd3f16419ce349c9f1b200d6d";
//Declaro el objeto PeliculasController (siempre igual para cada controller)
const PeliculasController = {};




//MÉTODO GET PARA MOSTRAR LAS 5 PRIMERAS PÁGINAS DE LAS PELÍCULAS MÁS VALORADAS DE TMDB
//http://localhost:3000/peliculas/toprated GET
PeliculasController.traeTopRatedPeliculas = async (req, res) => {
    const ratedArr = []; //Declaro array vacío que es donde guardaremos el json con el listado de películas
    try {
        //Creamos un bucle for e iteramos el valor de page para que nos saque las 5 primeras páginas de rated
        for(let i=1 ; i<6 ; i++){
            //llamada por axios al endpoint de TMDB interpolando la API_KEY
            let results = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${i}`);
            ratedArr.push(results.data)
        }//Muestro el array de páginas
        res.send(ratedArr);
    } catch(error) {
        res.send(error);
    };
};



PeliculasController.registraPelicula = (req, res) => {

};

PeliculasController.peliculasTitulo = async (req, res) => {

    let busqueda = req.query.criterio;

    try {

        let resultados = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&query=${busqueda}&page=1&include_adult=false`);

        res.send(resultados.data);
        

    } catch (error) {
        console.log(error);
    }

}

PeliculasController.traeNovedades = async (req, res) => {

    try {

        let resultados = await axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=es-ES&page=1");

        res.send(resultados.data);

    } catch (error) {
        console.log(error);
    }
}

PeliculasController.favouriteFilms = (req,res) => {


    let titulo = req.query.titulo;
    let adult = req.query.adult;
    let popularity = req.query.popularity;

    Pelicula.findAll({
        where : {

            [Op.and] : [
                {
                    titulo : {
                        [Op.like] : titulo
                    }
                },
                {
                    adult : {
                        [Op.like] : adult
                    }
                },
                {
                    popularity : {
                        [Op.like] : popularity
                    }
                }
            ]

        }
    }).then(films => {

        if(films != 0){
            res.send(films);
        }else {
            res.send(`Película no encontrada`);
        };

    }).catch(error => {
        res.send(error);
    })
}

PeliculasController.peliculasAdultas = (req,res) => {

    //todas las películas que no sean para niños

    Pelicula.findAll({
        where : {
            [Op.not] : [
                {
                    adult : {
                        [Op.like] : 0
                    }
                }
            ]
        }
    }).then(peliculasAdultas => {
        if(peliculasAdultas != 0){
            res.send(peliculasAdultas);
        }else {
            res.send("No hay películas que no sean para niños");
        }
    }).catch(error =>{
        res.send(error)
    })

}

//Exporto PeliculasController para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = PeliculasController;