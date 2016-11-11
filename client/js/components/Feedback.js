var React = require('react');

var Feedback = function (props) {
	



	if(!props.showNextQuestionButton) {
		return null;
	}
	return (
		<div>
			<div>{props.currentFeedback}</div>
			<button onClick={e => props.fetchNextQuestion(this.props.location.query.auth, props.isCorrect)}>Next</button>
		</div>
	)
}

module.exports = Feedback;