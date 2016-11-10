import 'babel-polyfill';
import express from 'express';
import passport from 'passport';
import secrets from '../secrets';
import User from '../schemas/user';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
import {errorHandler} from '../factories/utils';

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
		clientID: secrets.clientID,
		clientSecret: secrets.clientSecret,
		callbackURL: "http://" + secrets.devHostName + "/auth/google/callback",
		passReqToCallback: true

	},
	function(request, accessToken, refreshToken, profile, cb) {
		// console.log('accessToken', accessToken);
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
		// console.log('req.user', req.user);
		var accessToken = req.user.access_token;
		var redirectLink = '/?auth=' + accessToken;
		res.redirect(redirectLink);
	}
);

var bearerStrategy = new BearerStrategy(
        function(token, done) {
        	console.log('this is oken', token);

            User.findOne({
                    access_token: token
                },
                function(err, user) {

                	console.log('bearerStrategy: found user', user)

                    if (err) {
                        return done(err)
                    }
                    if (!user) {
                        return done(null, false)
                    }

                    return done(null, user, {
                        scope: 'all'
                    })
                }
            );
        }
    )
passport.use(bearerStrategy);


googleRouter.get(
    '/profile',
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
    	console.log('this is req', req);

    	User.find({}, function(err, users) {
		if(errorHandler(err, res)) return;
		console.log('this is users', users);
		return res.json(users);
	});
    }
);


export default googleRouter;