import express from 'express';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import User from '../schemas/user';
import {seedData, errorHandler} from '../factories/utils';

var usersRouter = express.Router();

//GET all the users from the db
usersRouter.get('/', function(req, res) {
	User.find({}, function(err, users) {
		if(errorHandler(err, res)) return;
		
		return res.json(users);
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
