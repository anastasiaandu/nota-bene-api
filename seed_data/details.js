const casual = require('casual');

module.exports = [
    {
        user_id: 2,
        label: 'Netflix Password',
        detail: casual.password
    },
    {
        user_id: 2,
        label: 'Email',
        detail: casual.email
    },
    {
        user_id: 2,
        label: 'Goal',
        detail: casual.word,
    },
    {
        user_id: 2,
        label: 'Movie Title',
        detail: casual.title,
    },
    {
        user_id: 2,
        label: 'Phone Number',
        detail: casual.phone,
    },
    {
        user_id: 4,
        label: 'Company',
        detail: casual.short_description
    },
    {
        user_id: 3,
        label: 'Email',
        detail: casual.email
    },
    {
        user_id: 5,
        label: 'Goal',
        detail: casual.word,
    },
    {
        user_id: 4,
        label: 'Movies',
        detail: casual.title,
    },
    {
        user_id: 1,
        label: 'Phone Number',
        detail: casual.phone,
    }
];