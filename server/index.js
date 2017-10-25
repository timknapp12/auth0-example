require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, function(accessToken, refreshToken, extraParams, profile, done) {

    //db queries

    done(null, profile)
}))

passport.serializeUser(function(profile, done) {
    done(null, profile);
}) 

passport.deserializeUser(function(profile, done) {
    done(null, profile);
}) 

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/auth'
}))

app.get('/auth/me', function(req, res) {
    if (!req.user) {
        return res.status(401).send('No user logged in');
    }
    return res.status(200).send(req.user);
})

const port = 3535;
app.listen(port, () => console.log(`listening on port ${port}`))