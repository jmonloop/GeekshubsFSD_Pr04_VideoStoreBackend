//Imports
const router = require('express').Router();
const FilmsController = require('../controllers/FilmsController');

//Endpoint-FilmController methods links
router.get('/', async(req, res) => {
    try {
        res.json(await FilmsController.getAll())
        // res.json(await FilmsController.clone())
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});
router.get('/db/:id', async(req, res) => {
    let id = req.params.id
    try {
        res.json(await FilmsController.getById(id))
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});
router.post('/', async(req, res) => {
    try {
        let id = req.body.id;
        let title = req.body.title;
        let parArr = [id, title];
        res.json(await FilmsController.register(...parArr))
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});
router.put('/:id', async(req, res) => {
    let id = req.params.id
    let body = req.body
    try {
        res.json(await FilmsController.modify(id, body))
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});
router.delete('/', async(req, res) => {
    try {
        res.json(await FilmsController.deleteAll());
    
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
})
router.delete('/:id', async(req, res) => {
    try {
        let id= req.params.id
        res.json(await FilmsController.deleteById(id));
    
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
})
router.get('/title', async(req, res) => {
    try {
        let search = req.query.arg;
        res.json(await FilmsController.APIgetByTitle(search))

    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});
router.get('/toprated', async(req, res) => {
    try {
        res.json(await FilmsController.APItopRated())

    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});
router.get('/amount', async(req, res) => {
    try {
        res.json(await FilmsController.getAmount())

    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});
router.get('/custom', async(req, res) => {
    try {
        let arg = req.query.arg
        res.json(await FilmsController.searchByTerm(arg))

    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});
router.get('/:id', async(req, res) => {
    try {
        let id = req.params.id
        res.json(await FilmsController.APIgetById(id))

    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});

//Export
module.exports = router;