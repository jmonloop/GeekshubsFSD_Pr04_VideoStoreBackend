//Imports
const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const UsersController = require('../controllers/UsersController');

//Enpoint-function links
router.get('/', UsersController.getUsers);
router.post('/', UsersController.writeRaw);
router.post('/register', UsersController.userRegister);
router.post('/login', headers, UsersController.login);
router.get('/email/:email', auth, UsersController.getUserByEmail);
router.get('/profile/:nickname', auth, UsersController.getUserByNickname);
router.delete('/', isAdmin, UsersController.deleteAll);
router.delete('/:id', auth, UsersController.deleteById);
router.put('/profile/:id', auth, UsersController.modifyUser);
router.put('/newpassword', auth, UsersController.updatePassword);
router.get('/custom/:arg', UsersController.searchByTerm)

//Export
module.exports = router;