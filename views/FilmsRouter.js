//Importo la clase express y la guardo en la variable express (siempre igual)
const router = require('express').Router();
//Importo el fichero UsuariosController y lo guardo en la variable UsuariosController. Luego habrá que crearlo.
const FilmsController = require('../controllers/FilmsController');

//Enlazo método(CRUD), endpoint y función. (Explicación en UsuariosRouter)
//http://localhost:3000/peliculas
// Copio 500 películas al azar de TMDB adaptando los campos necesarios para nuestra BBDD
router.get('/', async(req, res) => {
    try {
        res.json(await FilmsController.clone())
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});

//http://localhost:3000/peliculas
//Registro una película nueva
router.post('/', async(req, res) => {
    try {
        //Capturo las variables que llegan por el json de body
        let title = req.body.title;
        let synopsis = req.body.synopsis;
        let adult = req.body.adult;
        let popularity = req.body.popularity;
        let image = req.body.image;

        //Las guardo en un array
        let parArr = [title, synopsis, adult, popularity, image];

        //Las meto como parámetros usando spread
        res.json(await FilmsController.register(...parArr))
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});

//http://localhost:3000/peliculas (DELETE)
//Borro todas las pelculas de nuestra BBDD
router.delete('/', async(req, res) => {
    try {
        res.json(await FilmsController.deleteAll());
    
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
})

//http://localhost:3000/peliculas/titulo?criterio=tituloPelicula
//Busco y muestro perfiles de peliculas de TMDB por titulo usando query
router.get('/title', async(req, res) => {
    try {
        //En la variable busqueda guardamos lo que llega por query, es decir:
        //http://localhost:3000/peliculas/titulo?criterio=TITULO
        let search = req.query.arg;
        res.json(await FilmsController.APIgetByTitle(search))

    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});

//http://localhost:3000/peliculas/toprated
//Muestro las películas más votadas de TMDB (5 primeras páginas)
router.get('/toprated', async(req, res) => {
    try {
        res.json(await FilmsController.APItopRated())

    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});

//http://localhost:3000/peliculas/cantidad
//Muestro el número total de películas que hay registradas en nuestra BBDD
router.get('/amount', async(req, res) => {
    try {
        res.json(await FilmsController.getAmount())

    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});

//http://localhost:3000/peliculas/custom?termino=palabraABuscar
//Busco y muestro películas de nuestra BBDD con palabra coincidente usando query
router.get('/custom', async(req, res) => {
    try {
        //lo que metamos al final del endpoint será la id de la película a buscar en TMDB
        let arg = req.query.arg
        res.json(await FilmsController.searchByTerm(arg))

    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});


//http://localhost:3000/peliculas/idPeliculaEnTMDB GET
//Busco y muestro perfil de una pelicula buscándola por su id de TMDB usando params
//OJO! Si este endpoint lo pusiésemos arriba por ejemplo de el de buscar por titulo, JS al leer la URL cree que 'titulo' es un id y da fallo.
//Es por ello que al usar params hay que tener cuidado de no ponerlos en endpoints comunes o ponerlos al final del todo del xxxRouter
router.get('/:id', async(req, res) => {
    try {
        //lo que metamos al final del endpoint será la id de la película a buscar en TMDB
        let id = req.params.id
        res.json(await FilmsController.APIgetById(id))

    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});



//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;