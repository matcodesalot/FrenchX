import express from 'express';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import User from '../schemas/user';
import {seedData, errorHandler} from '../factories/utils';

let usersRouter = express.Router();

//GET all the users from the db
usersRouter.get('/', (req, res) => {
	User.find({}, (err, users) => {
		if(errorHandler(err, res)) return;
		
		return res.json(users);
	});
});

//DELETE a user in the db
usersRouter.delete('/:userId', (req, res) => {
	let theUser = req.params.userId;

	User.findByIdAndRemove(theUser, (err, user) => {
		if(errorHandler(err, res)) return;

		return res.json({});
	});
});


export default usersRouter;
