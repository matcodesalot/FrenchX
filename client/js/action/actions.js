var fetch = require('isomorphic-fetch');


//fetch question happens immediately after they logged in
//fetch question happens after clicking "next question"
var FETCH_QUESTION = 'FETCH_QUESTION';
function fetchQuestion(question, answer) {
	return {
		type: "FETCH_QUESTION",
		question: question,
		answer: answer
	}
}


//submit answer should be sent to the backend to trigger space repetition algorithm
var SUBMIT_ANSWER = 'SUBMIT_ANSWER';
function submitAnswer(answer) {
	return {
		type: SUBMIT_ANSWER,
		answer: answer
	}
}

var GENERATE_FEEDBACK = 'GENERATE_FEEDBACK';
function generateFeedback() {
	return {
		type: GENERATE_FEEDBACK
	}
}

//feedback should be fetched via API when answer gets submitted


//submit question, response ok and then send back next question data
//submit answer, feedback comes back and 'click next question button appears'

exports.FETCH_QUESTION = FETCH_QUESTION;
exports.fetchQuestion = fetchQuestion;

exports.SUBMIT_ANSWER = SUBMIT_ANSWER;
exports.submitAnswer = submitAnswer;

exports.GENERATE_FEEDBACK = GENERATE_FEEDBACK;
exports.generateFeedback = generateFeedback;