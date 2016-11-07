import express from 'express';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import Question from '../schemas/question';

var questionsRouter = express.Router();

//GET all the questions from the db
questionsRouter.get('/', function(req, res) {
	Question.find({}, function(err, questions) {
		if(err) {
			errorHandler(res);
		}
		return res.json(questions);
	});
});




function errorHandler(res) {
	return res.status(500).json({message: 'Internal server error :('});
}

module.exports = questionsRouter;