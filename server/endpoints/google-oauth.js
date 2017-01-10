import 'babel-polyfill';
import express from 'express';
import passport from 'passport';

let secrets;
if (!process.env.CLIENT_ID) secrets = require('../secrets');
import User from '../schemas/user';

import {seedData} from '../factories/utils';

const GoogleStrategy = require('passport-google-oauth20').Strategy;
let BearerStrategy = require('passport-http-bearer').Strategy;
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
		let userInfo = {
			googleId: profile.id,
			access_token: accessToken
		}

		User.findOne({googleId: userInfo.googleId}, function(err, user) {
			if(err) return res.status(404);
			if(user) {
				User.findOneAndUpdate(
					{
						googleId: user.googleId
					},
					{
						access_token: userInfo.access_token
					}, 
					{
						new: true
					},
					function(err, user) {
						return cb(null, user)
					}
				)
			}

			User.create({googleId: userInfo.googleId, access_token: userInfo.access_token, queue: seedData()}, (err, user) => {
				if(err) return cb(err);
				return cb(null, user);
			});
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

googleRouter.put('/logout', jsonParser, passport.authenticate('bearer', {session: false}), function(req, res) {
	const accessToken = req.body.accessToken;
	console.log('we are inside logout');
	User.findOneAndUpdate(
		{access_token: accessToken}, 
		{access_token: null},
		function(err, result) {
			console.log('inside database finding');
			console.log(result)
		}
	);

	return res.status(200).json({response: 'OK'});
});


export default googleRouter;