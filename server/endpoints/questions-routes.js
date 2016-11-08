import express from 'express';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import User from '../schemas/user';

var questionsRouter = express.Router();

//GET the current question the user is on
questionsRouter.get('/:userId', function(req, res) {
	const userId = req.params.userId;

	User.findById(userId, function(err, user) {
		if(err) {
			return errorHandler(res);
		}
		//returns the first question in the list
		return res.json(user.queue[0]);
	});
});

questionsRouter.post('/:userId/:isCorrect', function(req, res) {
	const userId = req.params.userId
	const isCorrect = req.params.isCorrect === "true";
	console.log(userId, isCorrect);
	User.findById(userId, function(err, user) {
		if(err) {
			return errorHandler(res);
		}

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
			if(err) {
				errorHandler(res);
			}

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


function errorHandler(res) {
	return res.status(500).json({message: 'Internal server error :('});
}

module.exports = questionsRouter;