var React = require("react");
var Link = require('react-router').Link;
var connect = require('react-redux').connect;


var Question = require("./Question");
var Answer = require("./Answer");
var Feedback = require('./Feedback');
var fetchNextQuestion = require("../action/actions").fetchNextQuestion;
var submitAcessToken = require("../action/actions").submitAcessToken;


//make app function that renders jsx element
var App = React.createClass({
    // componentDidMount: function() {
    //     // this.props.accessToken = this.props.location.query.auth;
    //     this.props.submitAcessToken(this.props.location.query.auth);
    // },

    // componentWillMount: function() {
    //     // this.props.accessToken = this.props.location.query.auth;
    //     this.props.submitAcessToken(this.props.location.query.auth);
    // },

    // componentWillReceiveProps: function(nextProps) {
    //    if(nextProps) {
    //     return true
    //    }
    // },

    // shouldComponentUpdate(nextProps, nextState) {
    //     if(nextProps && nextState) {
    //         return true
    //    }
    // },

    // componentWillMount: function() {
    //     // this.props.accessToken = this.props.location.query.auth;
    //     this.props.submitAcessToken(this.props.location.query.auth);
    // },

    render: function(props){
        console.log(this.props);
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
        isCorrect: state.isCorrect,
        acessToken: state.acessToken
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchNextQuestion: function(accessToken,isCorrect) {
            dispatch(fetchNextQuestion(isCorrect))
        }
    }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(App);