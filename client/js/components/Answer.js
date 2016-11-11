var React = require('react');
var ReactDOM = require('react-dom');
var submitAnswer = require("../action/actions").submitAnswer;
// var fetchNextQuestion = require('../action/actions').fetchNextQuestion;
var connect = require('react-redux').connect;



var Answer = React.createClass({
    getInitialState: function() {
        return {
            show: false
        };
    },
    changeState: function () {
        this.setState({
            show: !this.state.show
        });
    },
   onSubmit: function (event) {
        event.preventDefault();
        this.props.onAddSubmit(this.refs.answerInput.value);
        this.refs.answerInput.value = "";
        this.changeState();
   },
  
  render: function(props) {

    if(!props || props.showNextQuestionButton === true) {


        return (
          <div id = "english" className = "bottom-half half-width">
              <h1 id = "english-heading" className = "language">English</h1>
              <form onSubmit={this.onSubmit} onClick={this.changeState}>
                <input id ="answer-input" type="text" ref="answerInput" />
                <input id ="submit" type="submit" value="Submit"/>
              </form>
          </div>
      );
    }

      return (
        <div id = "english" className = "bottom-half half-width">
            <h1 id = "english-heading" className = "language">English</h1>
        </div>
      );
    

  }
});

function mapDispatchToProps(dispatch) {
    return {
        onAddSubmit: function(answerInput) {
            dispatch(submitAnswer(answerInput));
        }
    };
}

module.exports = connect(null, mapDispatchToProps)(Answer);
