const router = require('express').Router();
const itemsController = require('../controllers/itemsController');


router
    .route('/:userId/list/:listId')
    .get(itemsController.getAllItemsInList);

// router
//     .route('/')
//     .post(itemsController.addNewList);

// router
//     .route('/:listsId/list/:listId')
//     .get(itemsController.getSingleList)
//     .put(itemsController.updateList)
//     .delete(itemsController.deleteList);

module.exports = router;