import express from 'express';
<<<<<<< HEAD
//import {jsonParser} from 'body-parser';
var jsonParser = require('body-parser').json();
//import User from './schemas/user';

var usersRouter = express.Router();
usersRouter.use(jsonParser);

//GET all the users from the DB
usersRouter.get('/', function(req, res) {

});

//POST a new user into the DB
usersRouter.post('/', function(req, res) {
	
})
=======
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
	let email = req.body.email;

	if(!req.body) {
		return res.status(400).json({message: 'No request body'});
	}

	User.create(function(err, user) {
		if(err) {
			errorHandler(res);
		}

		let newUser = new User({
			email: email
		});

		newUser.save(function(err) {
			if(err) {
				errorHandler(res);
			}

			return res.status(201).json(newUser);
		});
	});
});




function errorHandler(res) {
	return res.status(500).json({message: 'Internal server error :('});
}

module.exports = usersRouter;
>>>>>>> 3679e06220234fbe99d4710cbccbc4e57997f98f
