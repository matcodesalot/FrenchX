var actions = require('../action/actions');
var update = require('react-addons-update');

var FETCH_QUESTION_SUCESS = actions.FETCH_QUESTION_SUCESS;
var FETCH_QUESTION_ERROR = actions.FETCH_QUESTION_ERROR;

var SUBMIT_ANSWER = actions.SUBMIT_ANSWER;

var FETCH_NEXT_QUESTION_SUCESS = actions.FETCH_NEXT_QUESTION_SUCESS;
var FETCH_NEXT_QUESTION_ERROR = actions.FETCH_NEXT_QUESTION_ERROR;


var initialState = {
	currentUser: null, //useremail
	currentQuestion: null, //bonjour
	correctAnswer: null,
	currentAnswerInput: null, //hello
	currentFeedback: null, //Correct or 'incorrect' + currentAnswerInput
	isCorrect: false,
	showNextQuestionButton: false,
	fetchQuestionError: false,
	nextQuestion: null
}

function questionsReducer(state, action) {
	var newState = {};
	state = state || initialState;

	switch (action.type) {
		
		case 'FETCH_QUESTION_SUCESS':
			newState = Object.assign({}, state, {
				currentQuestion: action.payload.question,
				correctAnswer: action.payload.answer
			});
			return newState;

		case 'FETCH_QUESTION_ERROR':
			newState = Object.assign({}, state, {
				currentQuestion: null,
				error: action.payload
			});
			return newState;
		

		case 'SUBMIT_ANSWER':
			console.log('answer submitted')
			newState = Object.assign({}, state, {
				currentAnswerInput: action.answer
			});

			if(newState.correctAnswer.toString().toLowerCase() === newState.currentAnswerInput.toString().toLowerCase()) {
				newState = Object.assign({}, state, {
					currentFeedback: 'Correct!',
					isCorrect: true,
					showNextQuestionButton: true
				})
			}	
			else {
				newState = Object.assign({}, state, {
					currentFeedback: 'Incorrect, please try again.',
					isCorrect: false,
					showNextQuestionButton: true
				})
			}

			console.log(newState);

			return newState;

		case 'FETCH_NEXT_QUESTION_SUCESS':
			console.log('next question success');

			//should reset the state again
			newState = Object.assign({}, state, initialState);

			return newState;

		case 'FETCH_NEXT_QUESTION_ERROR':

			newState = Object.assign({}, state, {
				thisError: action.payload
			});
			return newState;


		default: 
			return state;
	}
}

module.exports = questionsReducer;