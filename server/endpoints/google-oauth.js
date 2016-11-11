import 'babel-polyfill';
import express from 'express';
import passport from 'passport';
//import secrets from '../secrets';
var secrets;
if (!process.env.CLIENT_ID) secrets = require('../secrets');
import User from '../schemas/user';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
import {errorHandler} from '../factories/utils';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

const googleRouter = express.Router();

googleRouter.use(passport.initialize());
googleRouter.use(passport.session());


// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy(
	{
		clientID: process.env.CLIENT_ID || secrets.clientID,
        clientSecret: process.env.CLIENT_SECRET || secrets.clientSecret,
        callbackURL: process.env.DEV_HOST_NAME || secrets.devHostName + "/auth/google/callback",
		passReqToCallback: true

	},
	function(request, accessToken, refreshToken, profile, cb) {
		var userInfo = {
			googleId: profile.id,
			access_token: accessToken
		}
		User.findOrCreate(userInfo, function(err, user) {
			return cb(err, user);
		});
	}
));


googleRouter.get('/', passport.authenticate('google', {scope: ['profile'], session: false}));

googleRouter.get('/callback', passport.authenticate('google', {failureRedirect: '/login', session: false}),
	function(req, res) {
		//successful authentication, redirect home
		var accessToken = req.user.access_token;
		var redirectLink = '/home?auth=' + accessToken;
		res.redirect(redirectLink);
	}
);

var bearerStrategy = new BearerStrategy(function(token, done) {
    User.findOne({access_token: token}, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }

        return done(null, user, {scope: 'all'});
    });
});

passport.use(bearerStrategy);


// googleRouter.get('/logout', passport.authenticate('bearer', {session: false}), function(req, res) {
// 	res.redirect('/');
// });

googleRouter.post('/logout', jsonParser, passport.authenticate('bearer', {session: false}), function(req, res) {
	const accessToken = req.body.accessToken;

	User.findOneAndUpdate({access_token: accessToken}, {access_token: ""}, function(err, user) {
		if(errorHandler(err, res)) return;

		console.log("user logged out. accessToken destroyed.");
		return res.status(200).json({response: 'OK'});
	});
});


export default googleRouter;