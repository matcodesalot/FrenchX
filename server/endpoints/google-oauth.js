import 'babel-polyfill';
import express from 'express';
import passport from 'passport';
import secrets from '../secrets';
import User from '../schemas/user';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const googleRouter = express.Router();

passport.use(new GoogleStrategy(
	{
		//process.env.DATABASE_URI || global.databaseUri || 'mongodb://localhost/the_frogs'
		clientID: process.env.CLIENT_ID || global.clientID || secrets.clientID,
		clientSecret: process.env.CLIENT_SECRET || global.ClientSecret || secrets.clientSecret,
		callbackURL: process.env.DEV_HOST_NAME || global.devHostName || "http://" + secrets.devHostName + "/auth/google/callback",
		passReqToCallback: true

	},
	function(request, accessToken, refreshToken, profile, cb) {
		request.accessToken = accessToken;
		console.log("Welcome", profile.name.givenName + ".");
		User.findOrCreate(profile.id, function(err, user) {
			return cb(err, user);
		});
	}
));

googleRouter.use(passport.initialize());
googleRouter.use(passport.session());


googleRouter.get('/', passport.authenticate('google', {scope: ['profile'], session: false}));

googleRouter.get('/callback', passport.authenticate('google', {failureRedirect: '/login', session: false}),
	function(req, res) {
		//successful authentication, redirect home
		console.log('req.accessToken', req.accessToken);
		res.redirect('/?auth=' + req.accessToken);
	}
);

//token auth setup
passport.use(new BearerStrategy(function(token, done) {
	User.findOne({accessToken: token}, function(err, user) {
		if(err) {
			return done(err);
		}
		if(!user) {
			return done(null, false);
		}
		console.log("TOKEN", accessToken);
		return done(null, user, {scope: all});
	});
}));

export default googleRouter;