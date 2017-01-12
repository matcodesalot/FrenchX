var fetch = require('isomorphic-fetch');
var browserHistory = require('react-router').browserHistory;


//fetch API, no need to declare it as reducer case
function fetchQuestion(accessToken) {
	return function(dispatch) { 
		var url = '/questions/' + accessToken
		return fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(function(response) {
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

function fetchNextQuestion(accessToken, isCorrect) {
	return function (dispatch) {
		var url = '/questions/' + accessToken; 
		return fetch(url, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				isCorrect: isCorrect
			}),

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
			 
			dispatch(fetchNextQuestionSucess(data));
			return dispatch(fetchQuestion(accessToken));
		})
		.catch(function(error) {
 
			return  dispatch(fetchNextQuestionError(error));
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


var SUBMIT_ACCESS_TOKEN = 'SUBMIT_ACCESS_TOKEN';
function submitAcessToken(accessToken) {
	console.log(accessToken);
	return {
		type: SUBMIT_ACCESS_TOKEN,
		payload: accessToken
	}
}

var logoutUser = function(accessToken) {
		return function(dispatch) { 
			var url = '/auth/google/logout';
			return fetch(url, {
		  method: 'PUT',
	      headers: {
	        'Authorization': `Bearer ${accessToken}`,
	        'Accept': 'application/json',
			'Content-Type': 'application/json'
	      }, 
	      body: JSON.stringify({
				accessToken: accessToken
		  })
	    })
		.then(function(response) {
			if (response.status < 200 || response.status >= 300) {
				var error = new Error(response.statusText);
				error.response = response;
				throw error;
			}

			return response.json();
		})
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

exports.SUBMIT_ACCESS_TOKEN = SUBMIT_ACCESS_TOKEN;
exports.submitAcessToken = submitAcessToken;

exports.logoutUser = logoutUser;
