var actions = require('../action/actions');
var update = require('react-addons-update');

var initialState = {
	currentUser: null,
	currentQuestion: null,
	currentQuestionCount: null,
	totalQuestionCount: null,
	currentAnswerInput: null,
	currentFeedback: null,
	showResult: false, //either display question state or display result state
	isCorrect: false,
}

function stickyReducer(state, action) {
	var newstate;
	state = state || initialState;

	swtich(action.type) {
		case

		default: return state;
	}
}

module.exports = questionsReducer;