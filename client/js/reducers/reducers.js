var actions = require('../action/actions');
var update = require('react-addons-update');

var FETCH_QUESTION = actions.FETCH_QUESTION;
var SUBMIT_ANSWER = actions.SUBMIT_ANSWER;
var GENERATE_FEEDBACK = actions.GENERATE_FEEDBACK;

var initialState = {
	currentUser: null, //useremail
	currentQuestion: null, //bonjour
	correctAnswer: null,
	currentAnswerInput: null, //hello
	currentFeedback: null, //Correct or 'incorrect' + currentAnswerInput
	showResult: false, //either display question state or display result state
	isCorrect: false,
}

function questionsReducer(state, action) {
	var newstate = {};
	state = state || initialState;

	switch (action.type) {
		
		case 'FETCH_QUESTION':
			newState = Object.assign({}, state, {
				currentQuestion: action.question,
				correctAnswer: action.correctAnswer
			});
			return newState;

		case 'SUBMIT_ANSWER':
			console.log(action)
			newState = Object.assign({}, state, {
				currentAnswerInput: action.answer
			});
			return newState;

		case 'GENERATE_FEEDBACK':
			//if submitted answer === correctAnswer
			if (5 === state.currentAnswerInput) {
				newState = Object.assign({}, state, {
					currentFeedback: 'Correct!'
				})
			} 
			else {
				newState = Object.assign({}, state, {
					currentFeedback: 'Incorrect, please try again.'
				})
			}
			
			return newState;

		default: 
			return state;
	}
}

module.exports = questionsReducer;