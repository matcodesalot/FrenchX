var fetch = require('isomorphic-fetch');
var store = require('../store');

//fetch API, no need to declare it as reducer case
function fetchQuestion() {
	return function(dispatch) {
		//var url = '/questions/:userId' 
		var url = '/questions/58223e47f14cc779f9b3de5c' 
		// var url = '/questions/5821f72bf0aa44715522f6ae' 
		return fetch(url).then(function(response) {
			if (response.status < 200 || response.status >= 300) {
				var error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
			return response;
		})
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			console.log(data)
			dispatch(fetchQuestionSucess(data));
		})
		.catch(function(error) {
			return dispatch(
				fetchQuestionError(error)
				);
		})
	}
}

var FETCH_QUESTION_SUCESS = 'FETCH_QUESTION_SUCESS';
function fetchQuestionSucess(questionArray) {
	return {
		type: FETCH_QUESTION_SUCESS,
		payload: questionArray
	}
}

var FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';
function fetchQuestionError(error) {
	return {
		type: FETCH_QUESTION_ERROR,
		payload: error
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




function fetchNextQuestion(/*questionId, isCorrect*/) {
	return function (dispatch) {
		// var url = '/questions/58223e47f14cc779f9b3de5c/' + isCorrect 
		var url = '/questions/58223e47f14cc779f9b3de5c/' + 'true' 

		return fetch(url, {
			method: 'POST'
		})
		.then(function(response) {
			if (response.status < 200 || response.status >= 300) {
				var error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
			return response;
		})
		.then(function(response) {

			return response.json();
			
		})
		.then(function(data) {
			console.log(data);
			store.dispatch(fetchNextQuestionSucess(data));
			return store.dispatch(fetchQuestion());
		})
		.catch(function(error) {
			console.log(error);
			return store.dispatch(fetchNextQuestionError(error));
		})
	}
}

var FETCH_NEXT_QUESTION_SUCESS = 'FETCH_NEXT_QUESTION_SUCESS';
function fetchNextQuestionSucess(data) {
	return {
		type: FETCH_NEXT_QUESTION_SUCESS,
		payload: data
	}
}

var FETCH_NEXT_QUESTION_ERROR = 'FETCH_NEXT_QUESTION_ERROR';
function fetchNextQuestionError(error) {
	return {
		type: FETCH_NEXT_QUESTION_ERROR,
		payload: error
	}
}


exports.fetchQuestion = fetchQuestion;

exports.FETCH_QUESTION_SUCESS = FETCH_QUESTION_SUCESS;
exports.fetchQuestionSucess = fetchQuestionSucess;

exports.FETCH_QUESTION_ERROR = FETCH_QUESTION_ERROR;
exports.fetchQuestionError = fetchQuestionError;

exports.SUBMIT_ANSWER = SUBMIT_ANSWER;
exports.submitAnswer = submitAnswer;

exports.fetchNextQuestion = fetchNextQuestion;

exports.FETCH_NEXT_QUESTION_SUCESS = FETCH_NEXT_QUESTION_SUCESS;
exports.fetchQuestionSucess = fetchNextQuestionSucess;

exports.FETCH_NEXT_QUESTION_ERROR = FETCH_NEXT_QUESTION_ERROR;
exports.fetchNextQuestionError = fetchNextQuestionError;
