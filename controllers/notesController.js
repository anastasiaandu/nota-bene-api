const knex = require('knex')(require('../knexfile').development);

exports.getAllNotes = (req, res) => {
    knex('notes')
        .where({ user_id: req.params.id })
        .select('id', 'label', 'note', 'user_id', 'updated_at')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(404).send(`Error retrieving notes: ${err}`));
};

exports.getSingleNote = (req, res) => {
    knex('notes')
        .where({ user_id: req.params.notesId })
        .where({ id: req.params.noteId })
        .select('id', 'label', 'note', 'user_id', 'updated_at')
        .then((data) => {
            res.status(200).json(data[0]);
        })
        .catch((err) => res.status(404).send(`Error retrieving note: ${err}`));
};

exports.addNewNote = (req, res) => {
    if (!req.body.label || !req.body.note || !req.body.user_id) {
        return res.status(400).send('Please make sure to provide the label, note and user_id fields in a request');
    }

    knex('notes')
        .insert(req.body)
        .then((data) => {
            const newNoteURL = `/notes/${data[0]}`;
            res.status(201).location(newNoteURL).send(newNoteURL);
        })
        .catch((err) => {
            res.status(400).send(`Error creating note: ${err}`)
        });
};

exports.updateNote = (req, res) => {
    if (!req.body.label || !req.body.note || !req.body.user_id) {
        return res.status(400).send('Please make sure to provide the label, note and user_id fields in a request');
    }

    knex('notes')
        .update(req.body)
        .where({ user_id: req.params.notesId })
        .where({ id: req.params.noteId })
        .select('id', 'label', 'note', 'user_id', 'updated_at')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(400).send(`Error updating note: ${err}`));
};

exports.deleteNote = (req, res) => {
    knex('notes')
        .delete()
        .where({ user_id: req.params.notesId })
        .where({ id: req.params.noteId })
        .then(() => {
            res.status(204).json(`Note has been deleted`);
        })
        .catch((err) => res.status(400).send(`Error updating note: ${err}`));
};
