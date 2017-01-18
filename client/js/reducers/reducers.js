import * as actions from '../action/actions';

const FETCH_QUESTION_SUCESS = actions.FETCH_QUESTION_SUCESS,
	  FETCH_QUESTION_ERROR = actions.FETCH_QUESTION_ERROR,
	  SUBMIT_ANSWER = actions.SUBMIT_ANSWER,
	  FETCH_NEXT_QUESTION_SUCESS = actions.FETCH_NEXT_QUESTION_SUCESS,
	  FETCH_NEXT_QUESTION_ERROR = actions.FETCH_NEXT_QUESTION_ERROR,
	  SUBMIT_ACCESS_TOKEN = actions.SUBMIT_ACCESS_TOKEN;

const initialState = {
	currentUser: null,
	currentQuestion: null,
	correctAnswer: null,
	currentAnswerInput: null, 
	currentFeedback: null,
	isCorrect: false,
	score: 0,
	showNextQuestionButton: false,
	fetchQuestionError: false,
	nextQuestion: null,
	submitBoxShow: true
}

export default (state, action) => {
	state = state || initialState;

	switch (action.type) {
		
		case 'FETCH_QUESTION_SUCESS':
			return Object.assign({}, state, {
				currentQuestion: action.payload.queue.question,
				correctAnswer: action.payload.queue.answer,
				score: action.payload.score
			});

		case 'FETCH_QUESTION_ERROR':
			return Object.assign({}, state, {
				currentQuestion: null,
				error: action.payload
			});

		case 'SUBMIT_ANSWER':
			if(state.correctAnswer.toString().toLowerCase() === action.answer.toString().toLowerCase()) {
				return Object.assign({}, state, {
					currentAnswerInput: action.answer,
					currentFeedback: 'Correct!',
					isCorrect: true,
					showNextQuestionButton: true,
					submitBoxShow: false
				})
			}	
			else {
				return Object.assign({}, state, {
					currentAnswerInput: action.answer,
					currentFeedback: 'Incorrect, please try again.',
					isCorrect: false,
					showNextQuestionButton: true,
					submitBoxShow: false
				})
			}

		case 'FETCH_NEXT_QUESTION_SUCESS':
			//reset the state again
			return Object.assign({}, state, initialState);


		case 'FETCH_NEXT_QUESTION_ERROR':

			return Object.assign({}, state, {
				fetchQuestionError: action.payload
			});

		default: 
			return state;
	}
}