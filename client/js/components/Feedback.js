var React = require('react');

var Feedback = function (props) {
	console.log(props)
	
	return (
		<div>
			<button onClick={props.fetchNextQuestion.bind(this)}>Next</button>
		</div>
		)
}

module.exports = Feedback;