import 'babel-polyfill';
import express from 'express';
import passport from 'passport';
import secrets from '../secrets';
import User from '../schemas/user';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
	clientId: secrets.clientId,
	clientSecret: secrets.clientSecret,
	callbackURL: "http://" + secrets.devHostname + "/auth/google/callback"
	},
	function(accessToken, refreshToken, profile, cb) {
		User.findOrCreate({googleId: profile.id}, function(err, user) {
			return cb(err, user);
		});
	}
));