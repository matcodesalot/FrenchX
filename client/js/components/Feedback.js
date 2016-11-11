var React = require('react');


var Feedback = React.createClass({
	onClickNext: function(event) {
		event.preventDefault;
		props.fetchNextQuestion(this.props.location.query.auth, props.isCorrect);
	},
	render: function(props) {
		console.log(props);
		// if(!props.showNextQuestionButton) {
		// 	return null;
		// }
		
		return (
			<div>
				<div>{props.currentFeedback}</div>
				<button 
					onClick={this.onClickNext()}
				>
					Next
				</button>

			</div>
		)
	}

});


module.exports = Feedback;