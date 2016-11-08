var actions = require('../action/actions');
var update = require('react-addons-update');

var FETCH_QUESTION = actions.FETCH_QUESTION;
var SUBMIT_ANSWER = actions.SUBMIT_ANSWER;
var GENERATE_FEEDBACK = actions.GENERATE_FEEDBACK;

var french = [
	{
		question: "bonjour",
		answer: "hello",
		weight: 1
	},
	{
		question: "Je suis",
		answer: "I am",
		weight: 1
	},
	{
		question: "fromage",
		answer: "cheese",
		weight: 1
	}
]

//"Au revoir", "Je suis", "fromage", "visage", "entrepreneur","je ne sais quoi", "meurtre", "chien", " femme"]

//var English = ["Hello", "Goodbye", "I am", "cheese", "face", "businessman", "special something", "murder", "dog", "woman"]

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
	var newState = {};
	state = state || initialState;

	switch (action.type) {
		
		case 'FETCH_QUESTION':
			newState = Object.assign({}, state, {
				// currentQuestion: action.question, <--should be this below
				currentQuestion: french[0].question,
				// correctAnswer: action.correctAnswer
				correctAnswer: french[0].answer
			});
			return newState;

		case 'SUBMIT_ANSWER':
			console.log('answer submitted')
			newState = Object.assign({}, state, {
				currentAnswerInput: action.answer
			});
			console.log(newState);
			return newState;

		case 'GENERATE_FEEDBACK':
			//if submitted answer === correctAnswer
			if (state.correctAnswer === state.currentAnswerInput) {
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