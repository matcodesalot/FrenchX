import express from 'express';
import passport from 'passport';

import User from '../schemas/user';
import { errorHandler } from '../factories/utils';

let questionsRouter = express.Router();

//GET the current question the user is on
questionsRouter.get('/:accessToken', passport.authenticate('bearer', { session: false }), (req, res) => {
	const accessToken = req.params.accessToken;

	User.findOne({ access_token: accessToken }, (err, user) => {
		if(errorHandler(err, res)) return;

		//returns the first question in the list
		return res.json({
			queue: user.queue[0],
			score: user.score
		});
	});
});

//This handles the algorithm and moves the question back the appropriate amount of space
questionsRouter.post('/:accessToken', passport.authenticate('bearer', { session: false }), (req, res) => {
	const accessToken = req.params.accessToken;
	const isCorrect = req.body.isCorrect === true;

	User.findOne({access_token: accessToken}, (err, user) => {
		if(errorHandler(err, res)) return;

		let question = user.queue.shift(); //the current question

		if (isCorrect === true) {
			question.weight *= 2; //improve weight
			user.score += 10;
		}
		else {
			question.weight = 1; //reset weight to 1
		}

		if (question.weight >= user.queue.length) {
			user.queue.push(question);
		}
		else {
			user.queue.splice(question.weight, 0, question);
		}
		user.save((err) => {
			if(errorHandler(err, res)) return;
			
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


export default questionsRouter;