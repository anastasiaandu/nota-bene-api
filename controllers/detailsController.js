const knex = require('knex')(require('../knexfile').development);

exports.getAllDetails = (req, res) => {
    knex('details')
        .where({ user_id: req.params.id })
        .select('id', 'label', 'detail', 'user_id', 'updated_at')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(404).send(`Error retrieving details: ${err}`));
};

exports.getSingleDetail = (req, res) => {
    knex('details')
        .where({ user_id: req.params.userId })
        .where({ id: req.params.detailId })
        .select('id', 'label', 'detail', 'user_id', 'updated_at')
        .then((data) => {
            res.status(200).json(data[0]);
        })
        .catch((err) => res.status(404).send(`Error retrieving detail: ${err}`));
};

exports.addNewDetail = (req, res) => {
    if (!req.body.label || !req.body.detail || !req.body.user_id) {
        return res.status(400).send('Please make sure to provide the label, detail and user_id fields in a request');
    }

    knex('details')
        .insert(req.body)
        .then((data) => {
            const newDetailURL = `/details/${data[0]}`;
            res.status(201).location(newDetailURL).send(newDetailURL);
        })
        .catch((err) => {
            res.status(400).send(`Error creating detail: ${err}`)
        });
};

exports.updateDetail = (req, res) => {
    if (!req.body.label || !req.body.detail || !req.body.user_id) {
        return res.status(400).send('Please make sure to provide the label, detail and user_id fields in a request');
    }

    knex('details')
        .update(req.body)
        .where({ user_id: req.params.userId })
        .where({ id: req.params.detailId })
        .select('id', 'label', 'detail', 'user_id', 'updated_at')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(400).send(`Error updating detail: ${err}`));
};

exports.deleteDetail = (req, res) => {
    knex('details')
        .delete()
        .where({ user_id: req.params.userId })
        .where({ id: req.params.detailId })
        .then(() => {
            res.status(204).json(`Detail has been deleted`);
        })
        .catch((err) => res.status(400).send(`Error updating detail: ${err}`));
};
