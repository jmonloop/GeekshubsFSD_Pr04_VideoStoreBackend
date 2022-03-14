//Imports
const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/OrdersController');
const isAdmin = require('../middlewares/isAdmin');

////Enpoint-function links
router.post('/', OrdersController.createByBody);
router.post('/query', OrdersController.createByQuery);
router.get('/', OrdersController.fullReport);
router.get('/user', OrdersController.findUserMovies);
router.get('/:id', OrdersController.reportByUserId);
router.delete('/:id', OrdersController.deleteById);

//Export
module.exports = router;