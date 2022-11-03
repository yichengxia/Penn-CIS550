const express = require('express');
const passport = require('passport');
// const session = require('express-session');
require('./services/passport');

const app = express();

// const store = new session.MemoryStore();
// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60 * 60 * 1000 },
//     store
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(passport.initialize());
// app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
