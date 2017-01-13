import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

const fetchQuestion = (accessToken) => {
	return (dispatch) => { 
		const url = '/questions/' + accessToken
		return fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then((response) => {
			if (response.status < 200 || response.status >= 300) {
				const error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
			return response;
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			dispatch(fetchQuestionSucess(data));
		})
		.catch((error) => {
			return dispatch(
				fetchQuestionError(error)
				);
		})
	}
}

const FETCH_QUESTION_SUCESS = 'FETCH_QUESTION_SUCESS';
const fetchQuestionSucess = (questionArray) => {
	return {
		type: FETCH_QUESTION_SUCESS,
		payload: questionArray
	}
}

const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';
const fetchQuestionError = (error) => {
	return {
		type: FETCH_QUESTION_ERROR,
		payload: error
	}
}

const SUBMIT_ANSWER = 'SUBMIT_ANSWER';
const submitAnswer = (answer) => {
	return {
		type: SUBMIT_ANSWER,
		answer: answer
	}
}

const fetchNextQuestion = (accessToken, isCorrect) => {
	return (dispatch) => {
		const url = '/questions/' + accessToken; 
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
		.then((response) => {
			if (response.status < 200 || response.status >= 300) {
				const error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
			return response;
		})
		.then((response) => {

			return response.json();
			
		})
		.then((data) => {
			 
			dispatch(fetchNextQuestionSucess(data));
			return dispatch(fetchQuestion(accessToken));
		})
		.catch((error) => {
 
			return  dispatch(fetchNextQuestionError(error));
		})
	}
}

const FETCH_NEXT_QUESTION_SUCESS = 'FETCH_NEXT_QUESTION_SUCESS';
const fetchNextQuestionSucess = (data) => {
	return {
		type: FETCH_NEXT_QUESTION_SUCESS,
		payload: data
	}
}

const FETCH_NEXT_QUESTION_ERROR = 'FETCH_NEXT_QUESTION_ERROR';
const fetchNextQuestionError = (error) => {
	return {
		type: FETCH_NEXT_QUESTION_ERROR,
		payload: error
	}
}


const logoutUser = (accessToken) => {
		return (dispatch) => { 
			const url = '/auth/google/logout';
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
		.then((response) => {
			if (response.status < 200 || response.status >= 300) {
				const error = new Error(response.statusText);
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

exports.logoutUser = logoutUser;
