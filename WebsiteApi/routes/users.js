const express = require('express');
const {
    registerUser, 
    loginUser, 
    getUsers, 
    getUser, 
    updateUser, 
    deleteUser,
    createUser
} =  require('../controller/users')
const router = express.Router();
router.route('/')
                .get(getUsers)
                .post(createUser);
router.route('/register')
                .post(registerUser)
router.route('/login')
                .post(loginUser);
router.route("/:id")
                .get(getUser)
                .put(updateUser)
                .delete(deleteUser);
module.exports = router