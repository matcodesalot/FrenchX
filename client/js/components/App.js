var React = require("react");
var Question = require("./Question");
var Answer = require("./Answer");
var Feedback = require('./Feedback');
var fetchNextQuestion = require("../action/actions").fetchNextQuestion;
var connect = require('react-redux').connect;

//make app function that renders jsx element
var App = React.createClass({

    render: function(props){

        return (
            <div>
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
                    />
                </div>
            </div>
        );
    }

});

function mapStateToProps(state) {
    return {
        currentAnswerInput: state.currentAnswerInput,
        showNextQuestionButton: state.showNextQuestionButton
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchNextQuestion: dispatch(fetchNextQuestion)
    }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(App);