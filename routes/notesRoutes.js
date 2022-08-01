const router = require('express').Router();
const notesController = require('../controllers/notesController');


router
    .route('/:id')
    .get(notesController.getAllNotes);

router
    .route('/')
    .post(notesController.addNewNote);

router
    .route('/:notesId/note/:noteId')
    .get(notesController.getSingleNote)
    .put(notesController.updateNote)
    .delete(notesController.deleteNote);

module.exports = router;
