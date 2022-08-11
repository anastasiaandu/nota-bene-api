const knex = require('knex')(require('../knexfile').development);

exports.getAllItems = (req, res) => {
    knex('items')
        .where({ list_id: req.params.id })
        .select('id', 'label', 'item', 'user_id', 'list_id', 'checked', 'updated_at')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(404).send(`Error retrieving items: ${err}`));
};

exports.getSingleItem = (req, res) => {
    knex('items')
        .where({ list_id: req.params.listId })
        .where({ id: req.params.itemId })
        .select('id', 'label', 'item', 'user_id', 'list_id', 'checked', 'updated_at')
        .then((data) => {
            res.status(200).json(data[0]);
        })
        .catch((err) => res.status(404).send(`Error retrieving item: ${err}`));
};

exports.addNewItem = (req, res) => {
    if (!req.body.label || !req.body.item || !req.body.list_id) {
        return res.status(400).send('Please make sure to provide the label, item and list_id fields in a request');
    }

    knex('items')
        .insert(req.body)
        .then((data) => {
            const newItemURL = `/items/${data[0]}`;
            res.status(201).location(newItemURL).send(newItemURL);
        })
        .catch((err) => {
            res.status(400).send(`Error creating item: ${err}`)
        });
};

exports.updateItem = (req, res) => {
    if (!req.body.label || !req.body.item || !req.body.list_id) {
        return res.status(400).send('Please make sure to provide the label, item and list_id fields in a request');
    }

    knex('items')
        .update(req.body)
        .where({ list_id: req.params.listId })
        .where({ id: req.params.itemId })
        .select('id', 'label', 'item', 'user_id', 'list_id', 'updated_at')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(400).send(`Error updating item: ${err}`));
};

exports.deleteItem = (req, res) => {
    knex('items')
        .delete()
        .where({ list_id: req.params.listId })
        .where({ id: req.params.itemId })
        .then(() => {
            res.status(204).json(`item has been deleted`);
        })
        .catch((err) => res.status(400).send(`Error updating item: ${err}`));
};

