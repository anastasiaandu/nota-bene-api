const express = require('express');
const expressSession = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const knex = require('knex')(require('./knexfile').development);
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(express.static('public'));
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
const usersRoutes = require('./routes/usersRoutes');
const notesRoutes = require('./routes/notesRoutes');
const listsRoutes = require('./routes/listsRoutes');
const itemsRoutes = require('./routes/itemsRoutes');
const detailsRoutes = require('./routes/detailsRoutes');


app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/notes', notesRoutes);
app.use('/lists', listsRoutes);
app.use('/items', itemsRoutes);
app.use('/details', detailsRoutes);


app.listen(PORT, () => {
    console.log(`???? Server listening on port ${PORT}.`);
});
