import express from 'express';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import User from '../schemas/user';
import {errorHandler} from '../factories/utils';

var questionsRouter = express.Router();

//GET the current question the user is on
questionsRouter.get('/:userId', function(req, res) {
	const userId = req.params.userId;

	User.findById(userId, function(err, user) {
		if(errorHandler(err, res)) return;

		//returns the first question in the list
		return res.json(user.queue[0]);
	});
});

//This handles the algorithm and moves the question back the appropriate amount of space
questionsRouter.post('/:userId', jsonParser, function(req, res) {
	const userId = req.params.userId
	const isCorrect = req.body.isCorrect === "true";

	User.findById(userId, function(err, user) {
		if(errorHandler(err, res)) return;

		const question = user.queue.shift(); //the current question

		if (isCorrect) {
			//improve weight!
			question.weight *= 2;
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

			return res.sendStatus(200);
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
})


module.exports = questionsRouter;