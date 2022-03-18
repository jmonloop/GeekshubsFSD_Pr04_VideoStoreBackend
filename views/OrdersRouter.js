//Imports
const express = require('express');
const { reportByUserId } = require('../controllers/OrdersController');
const router = express.Router();
const OrdersController = require('../controllers/OrdersController');
const isAdmin = require('../middlewares/isAdmin');

////Enpoint-function links
router.post('/', OrdersController.createByBody);
router.put('/:id', OrdersController.modifyByBody);
router.post('/query', OrdersController.createByQuery);
router.get('/', OrdersController.fullReport);
router.get('/user', OrdersController.findUserMovies);
router.get('/:id', OrdersController.reportByUserId);
router.delete('/:id', OrdersController.deleteById);
router.get('/byid/:id', OrdersController.getById)

//Export
module.exports = router;