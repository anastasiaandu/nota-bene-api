const knex = require('knex')(require('../knexfile').development);
const passport = require('passport');
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;


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
    ),
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
                        avatar_url: profile._json.avatar_url,
                        username: profile.username
                    })
                    .then((userId) => {
                        done(null, { id: userId[0] });
                    })
                    .catch((err) => {
                        console.log('Error creating a user', err);
                    });
                }
            })
            .catch((err) => {
                console.log('Error fetching a user', err);
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
        console.log('Error finding user', err);
    });
});
