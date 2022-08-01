const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


router
    .route('/register')
    .post(usersController.addUser);

router
    .route('/login')
    .post(usersController.loginUser);

    
module.exports = router;
