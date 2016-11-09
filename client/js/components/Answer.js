var React = require('react');
var ReactDOM = require('react-dom');
var submitAnswer = require("../action/actions").submitAnswer;
// var fetchNextQuestion = require('../action/actions').fetchNextQuestion;
var connect = require('react-redux').connect;



var Answer = React.createClass({
   onSubmit: function (event) {
        event.preventDefault();
        this.props.onAddSubmit();
        this.refs.answerInput.value = "";
   },
  
  render: function() {
    return (
        <div>
            <h1>English</h1>
            <form onSubmit={this.onSubmit}>
            
              <input type="text" ref="answerInput" />
              <input type="submit" value="Submit"/>
            </form>
        </div>
    );
  }
});

function mapDispatchToProps(dispatch) {
    return {
        onAddSubmit: function() {
            dispatch(submitAnswer());
        }
    };
}

module.exports = connect(null, mapDispatchToProps)(Answer);
