const knex = require('knex')(require('../knexfile').development);

exports.getAllLists = (req, res) => {
    knex('lists')
        .where({ user_id: req.params.id })
        .select('id', 'label', 'list', 'user_id', 'updated_at')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(404).send(`Error retrieving lists: ${err}`));
};

exports.getSingleList = (req, res) => {
    knex('lists')
        .where({ user_id: req.params.listsId })
        .where({ id: req.params.listId })
        .select('id', 'label', 'list', 'user_id', 'updated_at')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(404).send(`Error retrieving list: ${err}`));
};

exports.addNewList = (req, res) => {
    if (!req.body.label || !req.body.list) {
        return res.status(400).send('Please make sure to provide the label and list fields in a request');
    }

    knex('lists')
        .insert(req.body)
        .then((data) => {
            const newListURL = `/lists/${data[0]}`;
            res.status(201).location(newListURL).send(newListURL);
        })
        .catch((err) => {
            res.status(400).send(`Error creating list: ${err}`)
        });
};

exports.updateList = (req, res) => {
    if (!req.body.label || !req.body.list) {
        return res.status(400).send('Please make sure to provide the label and list fields in a request');
    }

    knex('lists')
        .update(req.body)
        .where({ user_id: req.params.listsId })
        .where({ id: req.params.listId })
        .select('id', 'label', 'list', 'user_id', 'updated_at')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(400).send(`Error updating list: ${err}`));
};

exports.deleteList = (req, res) => {
    knex('lists')
        .delete()
        .where({ user_id: req.params.listsId })
        .where({ id: req.params.listId })
        .then(() => {
            res.status(204).json(`List has been deleted`);
        })
        .catch((err) => res.status(400).send(`Error updating list: ${err}`));
};
