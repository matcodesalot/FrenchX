import * as actions from '../action/actions';
import update from 'react-addons-update';

const FETCH_QUESTION_SUCESS = actions.FETCH_QUESTION_SUCESS;
const FETCH_QUESTION_ERROR = actions.FETCH_QUESTION_ERROR;

const SUBMIT_ANSWER = actions.SUBMIT_ANSWER;

const FETCH_NEXT_QUESTION_SUCESS = actions.FETCH_NEXT_QUESTION_SUCESS;
const FETCH_NEXT_QUESTION_ERROR = actions.FETCH_NEXT_QUESTION_ERROR;

const SUBMIT_ACCESS_TOKEN = actions.SUBMIT_ACCESS_TOKEN;


let initialState = {
	currentUser: null,
	currentQuestion: null,
	correctAnswer: null,
	currentAnswerInput: null, 
	currentFeedback: null,
	isCorrect: false,
	showNextQuestionButton: false,
	fetchQuestionError: false,
	nextQuestion: null,
	submitBoxShow: true
}

function questionsReducer (state, action) {
	let newState; 
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
			newState = Object.assign({}, state, {
				currentAnswerInput: action.answer
			});

			if(newState.correctAnswer.toString().toLowerCase() === newState.currentAnswerInput.toString().toLowerCase()) {
				newState = Object.assign({}, state, {
					currentAnswerInput: action.answer,
					currentFeedback: 'Correct!',
					isCorrect: true,
					showNextQuestionButton: true,
					submitBoxShow: false
				})
			}	
			else {
				newState = Object.assign({}, state, {
					currentAnswerInput: action.answer,
					currentFeedback: 'Incorrect, please try again.',
					isCorrect: false,
					showNextQuestionButton: true,
					submitBoxShow: false
				})
			}

			return newState;

		case 'FETCH_NEXT_QUESTION_SUCESS':
			//should reset the state again
			newState = Object.assign({}, state, initialState);

			return newState;

		case 'FETCH_NEXT_QUESTION_ERROR':

			newState = Object.assign({}, state, {
				thisError: action.payload
			});
			return newState;

		default: 
			return state || initialState;
	}
}


export default questionsReducer;