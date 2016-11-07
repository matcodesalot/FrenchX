import express from 'express';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
//import User from './schemas/user';

var usersRouter = express.Router();
//usersRouter.use(jsonParser);

//GET all the users from the DB
usersRouter.get('/', function(req, res) {

});

//POST a new user into the DB
usersRouter.post('/', function(req, res) {
	
});

module.exports = usersRouter;