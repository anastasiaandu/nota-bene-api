const router = require('express').Router();
const usersController = require('../controllers/usersController');


router
    .route('/register')
    .post(usersController.addUser);

router
    .route('/login')
    .post(usersController.loginUser);

router
    .route('/current')
    .get(usersController.getUser);


module.exports = router;
