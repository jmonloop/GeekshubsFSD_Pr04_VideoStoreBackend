//Importo la clase express y la guardo en la variable express (siempre igual)
const express = require('express');
//ejecuto el método Router() de express (siempre igual)
const router = express.Router();
//Importo el fichero UsuariosController y lo guardo en la variable UsuariosController. Luego habrá que crearlo.
const PeliculasController = require('../controllers/PeliculasController');

//Enlazo método(CRUD), endpoint y función. (Explicación en UsuariosRouter)
//http://localhost:3000/peliculas
//Coge las películas más votadas de TMDB (5 primeras páginas)
router.get('/', PeliculasController.traePeliculas);

//http://localhost:3000/peliculas/titulo?criterio=tituloPelicula
//Traer peliculas de TMDB por titulo usando query
router.get('/titulo', PeliculasController.peliculasTitulo);

//http://localhost:3000/peliculas/idPeliculaEnTMDB GET
//Traer datos de una pelicula buscándola por su id de TMDB usando params
//OJO! Si este endpoint lo pusiésemos arriba de el de buscar por titulo, JS al leer la URL cree que 'titulo' es un id y da fallo.
//Es por ello que al usar params hay que tener cuidado de no ponerlos en endpoints comunes o ponerlos al final del todo del xxxRouter
router.get('/:id', PeliculasController.APItraerPeliculaPorId);

//http://localhost:3000/peliculas
//Registrar una peli nueva
router.post('/', PeliculasController.registraPelicula);


//http://localhost:3000/peliculas/novedades
//Búsqueda de novedades
router.get('/novedades', PeliculasController.traeNovedades);


//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;