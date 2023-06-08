const express = require('express');
const router = express.Router();


const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');

router.get('/', getUsers);
router.put('/:id', updateUser);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

module.exports = router;