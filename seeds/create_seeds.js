const usersData = require('../seed_data/users');
const notesData = require('../seed_data/notes');
const listsData = require('../seed_data/lists');


exports.seed = function(knex) {
    return knex('users')
        .del()
        .then(() => {
            return knex('users').insert(usersData);
        })
        .then(() => {
            return knex('notes').del()
        })
        .then(() => {
            return knex('notes').insert(notesData);
        })
        .then(() => {
            return knex('lists').del()
        })
        .then(() => {
            return knex('lists').insert(listsData);
        });
};
