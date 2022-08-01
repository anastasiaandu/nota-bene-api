const bcrypt = require('bcryptjs');

module.exports = [
    {
        google_id: 82808628,
        email: 'tstark@yahoo.com',
        password: bcrypt.hashSync('bred32', 8),
        avatar_url: 'https://avatars.githubusercontent.com/u/92953487?v=4',
        username: 'Tony Stark'
    },
    {
        google_id: 86508234,
        email: 'john.doe@gmail.com',
        password: bcrypt.hashSync('johnny234', 8),
        avatar_url: 'https://avatars.githubusercontent.com/u/92953487?v=4',
        username: 'John Doe'
    },
    {
        google_id: 75808628,
        email: 'alex.green@gmail.com',
        password: bcrypt.hashSync('456ag', 8),
        avatar_url: 'https://avatars.githubusercontent.com/u/92953487?v=4',
        username: 'Alex Green'
    },
    {
        google_id: 75808653,
        email: 'david.champ@gmail.com',
        password: bcrypt.hashSync('dch1', 8),
        avatar_url: 'https://avatars.githubusercontent.com/u/92953487?v=4',
        username: 'David Champ'
    },
    {
        google_id: 6586734,
        email: 'janedoe@yahoo.com',
        password: bcrypt.hashSync('1234', 8),
        avatar_url: 'https://avatars.githubusercontent.com/u/92953487?v=4',
        username: 'Jane Doe'
    }
];