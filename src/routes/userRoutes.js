const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/user', auth, userController.getUsers);
router.get('/user/:userId', auth, userController.getUserById);
router.post('/user', auth, userController.createUser);
router.put('/user/:userId', auth, userController.updateUser);
router.patch('/user/:userId', auth, userController.updateUser);
router.delete('/user/:userId', auth, userController.softDeleteUser);

module.exports = router;
