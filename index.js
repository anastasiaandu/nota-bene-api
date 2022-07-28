const express = require('express');
const expressSession = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const knex = require('knex')(require('./knexfile.js').development);

require('dotenv').config();
const PORT = process.env.PORT || 5050;

const app = express();

app.use(express.json());
app.use(helmet());
app.use(
    cors({
      origin: true,
      credentials: true
    })
  );
app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    (_accessToken, _refreshToken, profile, done) => {
        console.log('Google profile:', profile);

        knex('users')
            .select('id')
            .where({ github_id: profile.id })
            .then(user => {
                if (user.length) {
                    // If user is found, pass the user object to serialize function
                    done(null, user[0]);
                } else {
                    // If user isn't found, we create a record
                    knex('users')
                    .insert({
                        github_id: profile.id,
                        avatar_url: profile._json.avatar_url,
                        username: profile.username
                    })
                    .then(userId => {
                        // Pass the user object to serialize function
                        done(null, { id: userId[0] });
                    })
                    .catch(err => {
                        console.log('Error creating a user', err);
                    });
                }
            })
            .catch(err => {
            console.log('Error fetching a user', err);
            });
        }
    )
);