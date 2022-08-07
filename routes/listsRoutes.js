const router = require('express').Router();
const listsController = require('../controllers/listsController');


router
    .route('/:id')
    .get(listsController.getAllLists);

router
    .route('/')
    .post(listsController.addNewList);

router
    .route('/:userId/list/:listId')
    .get(listsController.getSingleList)
    .put(listsController.updateList)
    .delete(listsController.deleteList);

module.exports = router;