//Importo la clase express y la guardo en la variable express (siempre igual)
const express = require('express');
//ejecuto el método Router() de express (siempre igual)
const router = express.Router();
//Importo el fichero UsuariosController y lo guardo en la variable UsuariosController. Luego habrá que crearlo.
const PeliculasController = require('../controllers/PeliculasController');

//Enlazo método(CRUD), endpoint y función. (Explicación en UsuariosRouter)
//http://localhost:3000/peliculas/toprated
//Coge las películas más votadas de TMDB (5 primeras páginas)
router.get('/toprated', PeliculasController.traeTopRatedPeliculas);

//http://localhost:3000/peliculas
//Registrar una peli nueva
router.post('/', PeliculasController.registraPelicula);

//http://localhost:3000/peliculas/favoritas
//Búsqueda de películas favoritas
router.get('/favoritas', PeliculasController.favouriteFilms);

//http://localhost:3000/peliculas/adultos
//Búsqueda de películas si son de adultos
router.get('/adultos', PeliculasController.peliculasAdultas);

//http://localhost:3000/peliculas/titulo
//Búsqueda de películas por título
router.get('/titulo', PeliculasController.peliculasTitulo);

//http://localhost:3000/peliculas/novedades
//Búsqueda de novedades
router.get('/novedades', PeliculasController.traeNovedades);


//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;