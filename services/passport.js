const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require('../config/keys');

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            // TODO: extract profile data to create a new user in db if not already
            console.log(accessToken);
            console.log(refreshToken);
            console.log(profile);
        })
);

passport.use(
    new FacebookStrategy(
        {
            clientID: keys.facebookClientID,
            clientSecret: keys.facebookClientSecret,
            callbackURL: "/auth/facebook/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            // TODO: extract profile data to create a new user in db if not already
            console.log(accessToken);
            console.log(refreshToken);
            console.log(profile);
        })
);

// TODO: serialize and deserialize user
