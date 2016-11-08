import express from 'express';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import User from '../schemas/user';
import {seedData, errorHandler} from '../factories/utils';

var usersRouter = express.Router();
//usersRouter.use(jsonParser);

//GET all the users from the db
usersRouter.get('/', function(req, res) {
	User.find({}, function(err, users) {
		if(errorHandler(err, res)) return;
		
		return res.json(users);
	});
});

//POST a new user into the db
usersRouter.post('/', jsonParser, function(req, res) {
	let email = req.body.email;

	if(!req.body) {
		return res.status(400).json({message: 'No request body'});
	}

	User.create(function(err, user) {
		if(errorHandler(err, res)) return;

		let newUser = new User({
			email: email,
			queue: seedData()
		});

		newUser.save(function(err) {
			if(errorHandler(err, res)) return;

			return res.status(201).json(newUser);
		});
	});
});

//DELETE a user in the db
usersRouter.delete('/:userId', function(req, res) {
	let theUser = req.params.userId;

	User.findByIdAndRemove(theUser, function(err, user) {
		if(errorHandler(err, res)) return;

		return res.json({});
	});
});


module.exports = usersRouter;
