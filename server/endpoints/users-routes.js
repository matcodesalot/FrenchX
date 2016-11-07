import express from 'express';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import User from '../schemas/user';

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
	User.save(function(err, user) {
		if(err) {
			errorHandler(res);
		}
		return res.status(201).json({});
	});
});




function errorHandler(res) {
	return res.status(500).json({message: 'Internal server error :('});
}

module.exports = usersRouter;