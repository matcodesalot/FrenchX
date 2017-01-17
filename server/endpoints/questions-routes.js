import express from 'express';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import User from '../schemas/user';
import {errorHandler} from '../factories/utils';
import passport from 'passport';

let questionsRouter = express.Router();

//GET the current question the user is on
questionsRouter.get('/:accessToken', passport.authenticate('bearer', { session: false }), function(req, res) {
	const accessToken = req.params.accessToken;

	User.findOne({access_token: accessToken}, function(err, user) {
		if(errorHandler(err, res)) return;

		//returns the first question in the list
		return res.json(user.queue[0]);
	});
});

//This handles the algorithm and moves the question back the appropriate amount of space
questionsRouter.post('/:accessToken', jsonParser, passport.authenticate('bearer', { session: false }), function(req, res) {
	const accessToken = req.params.accessToken;
	const isCorrect = req.body.isCorrect === true;

	User.findOne({access_token: accessToken}, function(err, user) {
		if(errorHandler(err, res)) return;

		let question = user.queue.shift(); //the current question

		if (isCorrect === true) {
			//improve weight!
			question.weight *= 2;
			user.score += 10;
		}
		else {
			//reset weight to 1
			question.weight = 1;
		}

		if (question.weight >= user.queue.length) {
			user.queue.push(question);
		}
		else {
			user.queue.splice(question.weight, 0, question);
		}
		user.save(function(err) {
			if(errorHandler(err, res)) return;

			//return res.sendStatus(200);
			return res.status(200).json({response: 'OK'});
		});
	});

	/*
		if question === correct:
		double the value of weight
		(weight = 1, weight *= 2, weight now = 2, move this question 2 spaces back in the array)
		if question === incorrect
		reset weight to 1
		move this question the new value of weight back in the array
	*/
});


module.exports = questionsRouter;