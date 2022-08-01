const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex')(require('../knexfile').development);


require('dotenv').config();

exports.addUser = (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).send('Please enter required fields to create an account');
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    knex('users')
        .insert({
            ...req.body,
            password: hashedPassword
        })
        .then(() => {
            res.status(201).send('You have successfully created an account');
        })
        .catch(err => {
            res.status(400).json({ message: 'Registration failed', error: err.sqlMessage });
        })
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Please enter required fields to log into you account");
    }

    knex('users')
        .where({ email: email })
        .then((user) => {
            if (!user.length) {
                return res.status(401).send('Email and password are invalid');
            }
            
            const isPasswordCorrect = bcrypt.compareSync(password, user[0].password);

            if (!isPasswordCorrect) {
                return res.status(401).send('Email and password are invalid');
            }

            const token = jwt.sign(
                { id: user[0].id, email: user[0].email },
                process.env.JWT_SECRET,
                {
                expiresIn: '24h'
                }
            )

            res.status(200).json({ token: token });
        })
        .catch(() => {
            return res.status(401).send('Email and password are invalid');
        });
};
