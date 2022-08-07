const router = require('express').Router();
const detailsController = require('../controllers/detailsController');


router
    .route('/:id')
    .get(detailsController.getAllDetails);

router
    .route('/')
    .post(detailsController.addNewDetail);

router
    .route('/:userId/detail/:detailId')
    .get(detailsController.getSingleDetail)
    .put(detailsController.updateDetail)
    .delete(detailsController.deleteDetail);

module.exports = router;
