import express from 'express';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import User from '../schemas/user';
import seedData from '../factories/seed-data';

var usersRouter = express.Router();
//usersRouter.use(jsonParser);

//GET all the users from the db
usersRouter.get('/', function(req, res) {
	User.find({}, function(err, users) {
		if(err) {
			errorHandler(res);
		}
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
		if(err) {
			errorHandler(res);
		}

		let newUser = new User({
			email: email,
			queue: seedData()
		});

		newUser.save(function(err) {
			if(err) {
				errorHandler(res);
			}

			return res.status(201).json(newUser);
		});
	});
});

//DELETE a user in the db
usersRouter.delete('/:userId', function(req, res) {
	let theUser = req.params.userId;

	User.findByIdAndRemove(theUser, function(err, user) {
		if(err) {
			errorHandler(res);
		};

		return res.json({});
	});
});


function errorHandler(res) {
	return res.status(500).json({message: 'Internal server error :('});
}

module.exports = usersRouter;