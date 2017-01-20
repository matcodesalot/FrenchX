import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

//fetch query function to handle queries for POST, PUT, and DELETE methods
export const fetchQuery = (url, method, body, accessToken) => fetch(url, {
	method: method,
	headers: {
		'Authorization': `Bearer ${accessToken}`,
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}, 
	body: JSON.stringify(body)
})

export const fetchQuestion = (accessToken) => {
	return (dispatch) => { 
		const url = '/questions/' + accessToken
		return fetch(url, {
			headers: {
     		'Authorization': `Bearer ${accessToken}`
      	}
    })
	.then((response) => (response.ok === false) ? Promise.reject(response.json()) : response.json())
	.then((data) => dispatch(fetchQuestionSucess(data)))
	.catch((error) => dispatch(fetchQuestionError(error)));
	}
}

export const FETCH_QUESTION_SUCESS = 'FETCH_QUESTION_SUCESS';
export const fetchQuestionSucess = (questionArray) => {
	return {
		type: FETCH_QUESTION_SUCESS,
		payload: questionArray
	}
}

export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';
export const fetchQuestionError = (error) => {
	return {
		type: FETCH_QUESTION_ERROR,
		payload: error
	}
}

export const SUBMIT_ANSWER = 'SUBMIT_ANSWER';
export const submitAnswer = (answer) => {
	return {
		type: SUBMIT_ANSWER,
		answer: answer
	}
}

export const fetchNextQuestion = (accessToken, isCorrect) => {
	return (dispatch) => {
		const url = '/questions/' + accessToken; 
		return fetchQuery(url, 'POST', { isCorrect: isCorrect }, accessToken)
		.then((response) => (response.ok === false) ? Promise.reject(response.json()) : response.json())
		.then((data) => {
			dispatch(fetchNextQuestionSucess(data));
			return dispatch(fetchQuestion(accessToken));
		})
		.catch((error) => dispatch(fetchNextQuestionError(error)));
	}
}

export const FETCH_NEXT_QUESTION_SUCESS = 'FETCH_NEXT_QUESTION_SUCESS';
export const fetchNextQuestionSucess = (data) => {
	return {
		type: FETCH_NEXT_QUESTION_SUCESS,
		payload: data
	}
}

export const FETCH_NEXT_QUESTION_ERROR = 'FETCH_NEXT_QUESTION_ERROR';
export const fetchNextQuestionError = (error) => {
	return {
		type: FETCH_NEXT_QUESTION_ERROR,
		payload: error
	}
}

export const logoutUser = (accessToken) => {
	return (dispatch) => { 
		const url = '/auth/google/logout';
		return fetchQuery(url, 'PUT', { accessToken: accessToken }, accessToken)
		.then((response) => (response.ok === false) ? Promise.reject(response.json()) : response.json())
		.then((response) => browserHistory.push('/'));
	}
}