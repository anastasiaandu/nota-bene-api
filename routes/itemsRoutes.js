const router = require('express').Router();
const itemsController = require('../controllers/itemsController');


router
    .route('/:id')
    .get(itemsController.getAllItems);

router
    .route('/')
    .post(itemsController.addNewItem);

router
    .route('/:listId/item/:itemId')
    .get(itemsController.getSingleItem)
    .put(itemsController.updateItem)
    .delete(itemsController.deleteItem);

module.exports = router;