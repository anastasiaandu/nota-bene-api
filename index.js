const express = require('express');
const expressSession = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const knex = require('knex')(require('./knexfile').development);
const passport = require('passport');
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 5050;

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
    new ClientPasswordStrategy(
        function(clientId, clientSecret, done) {
            Clients.findOne({ clientId: clientId }, function (err, client) {
                if (err) { return done(err); }
                if (!client) { return done(null, false); }
                if (client.clientSecret != clientSecret) { return done(null, false); }
                return done(null, client);
            });
        }
    )
);

passport.use (
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
                .where({ google_id: profile.id })
                .then(user => {
                    if (user.length) {
                        done(null, user[0]);
                    } else {
                        knex('users')
                        .insert({
                            google_id: profile.id,
                            email: profile._json.email,
                            picture: profile._json.picture,
                            username: profile.displayName
                        })
                        .then((userId) => {
                            done(null, { id: userId[0] });
                        })
                        .catch((err) => {
                            console.log(`Error creating a user: ${err}`);
                        });
                    }
                })
                .catch((err) => {
                    console.log(`Error fetching a user: ${err}`);
                });
        }
    )
);


passport.serializeUser((user, done) => {
    console.log('serializeUser (user object):', user);

    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    console.log('deserializeUser (user id):', userId);

    knex('users')
        .where({ id: userId })
        .then((user) => {

        console.log('req.user:', user[0]);
        done(null, user[0]);
    })
    .catch((err) => {
        console.log(`Error finding a user: ${err}`);
    });
});

const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');
const listsRoutes = require('./routes/listsRoutes');
const itemsRoutes = require('./routes/itemsRoutes');
// const filesRoutes = require('./routes/filesRoutes');
const usersRoutes = require('./routes/usersRoutes');

app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);
app.use('/lists', listsRoutes);
app.use('/items', itemsRoutes);
// app.use('/files', filesRoutes);
app.use('/users', usersRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}.`);
});
