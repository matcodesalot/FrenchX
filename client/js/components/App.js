var React = require("react");
var Link = require('react-router').Link;
var connect = require('react-redux').connect;

var Question = require('./Question');

var fetchNextQuestion = require("../action/actions").fetchNextQuestion;
var submitAcessToken = require("../action/actions").submitAcessToken;
var fetchQuestion = require("../action/actions").fetchQuestion;
var submitAnswer = require("../action/actions").submitAnswer;
var logoutUser = require("../action/actions").logoutUser;

//make app function that renders jsx element
var App = React.createClass({
    componentDidMount: function() {
        this.props.fetchCurrentQuestion(this.props.location.query.auth);
        this.props.sendAccessToken(this.props.location.query.auth);
    },
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },

    onSubmit: function (event) {
        event.preventDefault();
        this.props.onAddSubmit(this.refs.answerInput.value);
        this.refs.answerInput.value = "";
   },

   onClickLogout: function() {
        console.log('clicked logout');
        this.props.onClickLogoutUser(this.props.location.query.auth);
   },

    showResult: function() {
        if(this.props.showNextQuestionButton === true) {
            return (
                <div>
                    <div>
                        <div id = "english" className = "bottom-half half-width">
                            <h1 id = "english-heading" className = "language">English</h1>
                        </div>
                    </div>

                    <button id="next-button" onClick={e => this.props.fetchFollowingQuestion(this.props.location.query.auth, this.props.isCorrect)}> Next </button>
                </div>
            )
        }
        else {
            return (
                <div id = "english" className = "bottom-half half-width">
                    <h1 id = "english-heading" className = "language">English</h1>
                    <form onSubmit={this.onSubmit}>
                      <input id ="answer-input" type="text" ref="answerInput" />
                      <input id ="submit" type="submit" value="Submit"/>
                    </form>
                </div>
            );
        }
    },

    render: function(){
        console.log(this.props.accessToken);
        return (
            <div id="top-level-component">
                <h1>French X</h1>
                <div id="logout-button" className="hide show">
                    <Link  to="/" onClick={this.onClickLogout} >Logout</Link>
                </div>

                <div>
                    <Question 
                        currentQuestion={this.props.currentQuestion}
                        showNextQuestionButton={this.props.showNextQuestionButton}
                        currentFeedback={this.props.currentFeedback}
                    />
                </div>

                {this.showResult()}
            </div>
        );
    }

});

function mapStateToProps(state) {
    console.log('msp');
    return {
        currentQuestion: state.currentQuestion,
        currentAnswerInput: state.currentAnswerInput,
        showNextQuestionButton: state.showNextQuestionButton,
        currentFeedback: state.currentFeedback,
        isCorrect: state.isCorrect,
        accessToken: state.accessToken,
        submitBoxShow: state.submitBoxShow
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchFollowingQuestion: function(accessToken, isCorrect) {
            dispatch(fetchNextQuestion(accessToken, isCorrect));
        },
        fetchCurrentQuestion: function(accessToken) {
            dispatch(fetchQuestion(accessToken));
        },
        onAddSubmit: function(answerInput) {
            dispatch(submitAnswer(answerInput));
        },
        onClickLogoutUser: function(accessToken) {
            dispatch(logoutUser(accessToken));
        },
        sendAccessToken: function(accessToken) {
            dispatch(submitAcessToken(accessToken));
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);