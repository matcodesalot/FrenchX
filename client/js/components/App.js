var React = require("react");
var Link = require('react-router').Link;
var connect = require('react-redux').connect;


var Question = require("./Question");
var Answer = require("./Answer");
var Feedback = require('./Feedback');
var fetchNextQuestion = require("../action/actions").fetchNextQuestion;




//make app function that renders jsx element
var App = React.createClass({


    render: function(props){

        return (
            <div id="top-level-component">
                <h1>French X</h1>
                <div>
                    <Question />
                </div>
                <div>
                    <Answer />
                </div>

                <div>
                    <Feedback 
                        fetchNextQuestion={this.props.fetchNextQuestion}
                        showNextQuestionButton={this.props.showNextQuestionButton}
                        currentFeedback={this.props.currentFeedback}
                        isCorrect={this.props.isCorrect}
                    />
                </div>
            </div>
        );
    }

});

function mapStateToProps(state) {
    return {
        currentAnswerInput: state.currentAnswerInput,
        showNextQuestionButton: state.showNextQuestionButton,
        currentFeedback: state.currentFeedback,
        isCorrect: state.isCorrect
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchNextQuestion: function(isCorrect) {
            dispatch(fetchNextQuestion(isCorrect))
        }
    }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(App);