import 'babel-polyfill';
import express from 'express';
import passport from 'passport';
import User from '../schemas/user';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import {errorHandler} from '../factories/utils';
const googleRouter = express.Router();

let secrets;
if (!process.env.CLIENT_ID) secrets = require('../secrets');
import { seedData } from '../factories/utils';

googleRouter.use(passport.initialize());
googleRouter.use(passport.session());

// used to serialize the user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
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
	(request, accessToken, refreshToken, profile, cb) => {
		let userInfo = {
			googleId: profile.id,
			access_token: accessToken,
			name: profile.name
		}

		User.findOne({googleId: userInfo.googleId}, (err, user) => {
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
					(err, user) => {
						return cb(null, user)
					}
				)
			} else {
				User.create(
					{
						googleId: userInfo.googleId, 
						access_token: userInfo.access_token, 
						name: userInfo.name,
						queue: seedData(), score: 0}, 
						(err, user) => {
							if(err) return cb(err);
								return cb(null, user);
					}
				);
			}			
		});
	}
));

googleRouter.get('/', passport.authenticate('google', {scope: ['profile'], session: false}));

googleRouter.get('/callback', passport.authenticate('google', {failureRedirect: '/login', session: false}),
	(req, res) => {
		//successful authentication, redirect home
		const accessToken = req.user.access_token,
			  redirectLink = '/home?auth=' + accessToken;
		res.redirect(redirectLink);
	}
);

const bearerStrategy = new BearerStrategy((token, done) => {
    User.findOne({ access_token: token }, (err, user) => {
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

googleRouter.put('/logout', passport.authenticate('bearer', {session: false}), (req, res) => {
	const accessToken = req.body.accessToken;
	User.findOneAndUpdate(
		{access_token: accessToken}, 
		{access_token: null},
		(err, result) => {
			return res.status(200).json({response: 'OK'});
		}
	);	
});

export default googleRouter;