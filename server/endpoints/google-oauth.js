import 'babel-polyfill';
import express from 'express';
import passport from 'passport';
import secrets from '../secrets';
import User from '../schemas/user';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const googleRouter = express.Router();

passport.use(new GoogleStrategy(
	{
		clientID: secrets.clientID,
		clientSecret: secrets.clientSecret,
		callbackURL: "http://" + secrets.devHostName + "/auth/google/callback",
		passReqToCallback: true

	},
	function(request, accessToken, refreshToken, profile, cb) {
		request.accessToken = accessToken;

		User.findOrCreate(profile.id, function(err, user) {
			return cb(err, user);
		});
	}
));

googleRouter.use(passport.initialize());


googleRouter.get('/', passport.authenticate('google', {scope: ['profile'], session: false}));

googleRouter.get('/callback', passport.authenticate('google', {failureRedirect: '/login', session: false}),
	function(req, res) {
		//successful authentication, redirect home
		console.log('req.accessToken', req.accessToken);
		res.redirect('/?auth=' + req.accessToken);
	}
);

export default googleRouter;