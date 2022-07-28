const express = require('express');
const expressSession = require('express-session');
const cors = require('cors');
const passport = require('passport');
const helmet = require('helmet');
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

// const authRoutes = require('./routes/auth');
// const notesRoutes = require('./routes/notes');
// const listsRoutes = require('./routes/lists');
// const filesRoutes = require('./routes/files');

// app.use('/auth', authRoutes);
// app.use('/notes', notesRoutes);
// app.use('/lists', listsRoutes);
// app.use('/files', filesRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}.`);
});
