const passport = require('passport');

module.exports = app => {
    // app.post('/login', passport.authenticate('local'), (req, res) => {
    //     res.send(200);
    // });

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google', passport.authenticate('google'))
    );
};