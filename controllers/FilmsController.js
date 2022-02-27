//Importo la clase axios para poder hacer llamadas a otros endpoints
const axios = require("axios");
//Importo el modelo Pelicula desestructurado (en formato objeto) para poder escribir en la tabla Pelicula de la BBDD
const { Film } = require('../models/index')
//Declaro la API_KEY necesaria para ejecutar endpoints en TMDB
const API_KEY = "210d6a5dd3f16419ce349c9f1b200d6d";
//Declaro función para obtener número random entre dos límites
const minMaxRoundedRandom = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}


//En esta forma, lo que generamos es una clase PeliculaClass (con constructor vacío) donde meteremos todos los métodos que hacen de función controladora.

//Las principales diferencias respecto al método que hemos usado en UsuariosController es que de esta forma hemos de meter los parámetros de entrada (req.query, req.params o req.body) en la declaración del endpoint (en el xxxRouter).
//La otra diferencia es que en la función controladora, al ser un método, en vez de devolver resultados por res.send, los devolvemos con return.
class FilmClass {
    constructor(){

    };

    //Clono 500 películas aleatorias de TMDB adaptando los campos a los de mi BBDD
    clone = async () => {
        //Variable para añadir a la imagen de TMDB y guardarla en nuestra BBDD
        let TMDBimgUrlRoot = "https://image.tmdb.org/t/p/original";
        //Lanzo axios una vez para capturar la cantidad de páginas total que voy a tener que recorrer
        let firstScan = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
        // Guardo el total de páginas que necesito recorrer (no se usa porque TMDB te limita a 10k películas)
        let numbOfPagesTMDB = firstScan.data.total_pages
        let numbOfFilmsTMDB = firstScan.data.total_results

        //Si quisiéramos clonar TODA TMDB habría que meter el valor en j<valor. Para este proyecto he preferido clonar solo 25 páginas para no demorar mucho la práctica.
        for(let j=1 ; j<=25 ; j++) {
            //Hago la llamada al endpoint de TMDB interpolando la función random donde va el número de página y así no traernos siempre los resultados en el mismo orden
            let resultss = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${minMaxRoundedRandom(1, 25)}&with_watch_monetization_types=flatrate`);
        
            //Variable para saber los resultados por página
            let numbOfResultsPerPageTMDB = resultss.data.results.length
            //Recorro los resultados de la página guardando los campos que me interesan en mi BBDD..
            for(let i=0; i<numbOfResultsPerPageTMDB ; i++) {
                Film.create({
                    //..guardando en cada atributo los datos que llegan por body
                    title : resultss.data.results[i].original_title,
                    synopsis : resultss.data.results[i].overview,
                    adult : resultss.data.results[i].adult,
                    popularity : resultss.data.results[i].popularity,
                    image : (TMDBimgUrlRoot + "/" + resultss.data.results[i].poster_path)
                })
            }
        }

        return (`${25} pages have been clonated satisfactorily, with a total amount of ${500} films`)
    };

    //Registro pelicula con los parámetros que llegan por body
    register = async (title, synopsis, adult, popularity, image) => {
        //Hago findAll de la película
        return (
            Film.findAll({
            //Donde el atributo title se compara con el title que llega por body
            where : {title : title}
            
                //Si la promesa se cumple
            }).then(repeatedFilm => {
                //Si no la encuentra (array vacío)...
                if(repeatedFilm == 0) {
                    //Crea un elemento nuevo en la tabla Pelicula
                    return Film.create({
                        //guardando en cada atributo los datos que llegan por body
                        title : title,
                        synopsis : synopsis,
                        adult : adult,
                        popularity : popularity,
                        image : image
                    }).then(film => {
                        //Y envío un mensaje de confirmación
                        return (`The film ${film.dataValues.title}, has been registered satisfactorily`);
                    }).catch((error) => {
                        return (error);
                    });
                    
                    
                //Si la encuentra...
                }else {
                    //Envío mensaje de que ya existe en la BBDD
                    return (`The film ${repeatedFilm[0].title}, is already registered in the database`);
                }
            })
        )

    // // {
    // //     "title": "El silencio de los corderos",
    // //     "synopsis": "Un tío muy carismático que come personas",
    // //     "adult" : true,
    // //     "popularity": 7.3,
    // //     "image": "stringIMAGE"
    // // }

    };

    //Borro todas las películas de mi BBDD
    deleteAll = async () => {
        return ( 
            Film.destroy({
            where : {}, //No se especifica ningún elemento ya que queremos borrarlos todos
            truncate : false //Resetea todas las pk
            }).then (elmnt => {
                return  (`${elmnt} films have been deleted`)
            })    
        )
    };

    //Busco y muestro pelicula de TMDB por título usando query
    APIgetByTitle = async (title) => {
        //Hago la llamada al endpoint de TMDB interpolando la API_KEY y el valor de búsqueda.
        let results = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${title}&page=1&include_adult=false`);

        return(results.data);

    };

    //Muestro 5 primeras páginas de las películas más valoradas de TMDB
    APItopRated = async () => {
        //Declaro array vacío que es donde guardaremos el json con el listado de películas
        const ratedArr = [];

        //Creamos un bucle for e iteramos el valor de page para que nos saque las 5 primeras páginas de rated
        for(let i=1 ; i<6 ; i++){
            //llamada por axios al endpoint de TMDB interpolando la API_KEY
            let results = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${i}`);
            ratedArr.push(results.data)
        }
        
        //Muestro el array de páginas generado
        return (ratedArr);
    };

    //Muestro el número total de películas registradas en nuestra BBDD
    getAmount = async () => {
        //declaro el string que forma la consulta de SQL
        let consult = `SELECT COUNT(*) FROM films;`;

        //genero el método de sequelize para hacer a consulta SQL en crudo
        let result = await Film.sequelize.query(consult,{
            //Esta línea es para que no devuelva resultados duplicados
            type: Film.sequelize.QueryTypes.SELECT});

        //Si obtengo respuesta de la consulta..
        if(result){
            //..accedo al valor para saber el total de elementos
            let value = result[0]['COUNT(*)']
            if(value > 0) {
                return (`There are ${value} registered films in the database`);
            }else {
                return(`There are not films registered in the database`)
            };
        };
    };

    //Busco y muestro películas de nuestra BBDD con palabra coincidente usando query
    searchByTerm = async (arg) => {

        //declaro el string que forma la consulta de SQL
        let consult = 
            `SELECT * FROM videoclub.films
            WHERE title LIKE '%${arg}%'
            OR synopsis LIKE '%${arg}%'`;

        //genero el método de sequelize para hacer a consulta SQL en crudo
        let result = await Film.sequelize.query(consult,{
            //Esta línea es para que no devuelva resultados duplicados
            type: Film.sequelize.QueryTypes.SELECT});

        //Si la consulta devuelve algún resultado..
        if(result != 0){
            //..muestro los resultados obtenidos
           return result
        }else {
            return (`The term ${arg} is not present at films database`)
        }

    };

    //Busco y muestro película de TMDB por id usando params
    APIgetById = async (id) => {
        //Hago llamada al endpoint de TMDB interpolando el id que nos llega por params
        let results = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)

        return results.data
    };

}








let FilmsController = new FilmClass();

//Exporto PeliculasController para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = FilmsController;