
const express = require('express');
const router = express.Router();

const OrdersController = require('../controllers/OrdersController');
const isAdmin = require('../middlewares/isAdmin');
router.post('/', isAdmin, OrdersController.createByBody);
router.post('/query', OrdersController.createByQuery);
router.get('/', OrdersController.fullReport);
router.get('/:user', OrdersController.reportByUser);
router.delete('/:id', OrdersController.deleteById);
module.exports = router;