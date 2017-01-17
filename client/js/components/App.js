import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../action/actions';

//child components
import Question from './Question';
import English from './English';
import CardAnswer from './CardAnswer';
import CardNext from './CardNext';
import Logout from './Logout';
import Score from './Score';

//google material UI theme provider 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
    constructor(props) {
        super(props);
        this.onClickLogout = this.onClickLogout.bind(this);
        this.onSubmitNextQuestion = this.onSubmitNextQuestion.bind(this);
    }

    componentDidMount () {
        this.props.dispatch(actions.fetchNextQuestion(this.props.location.query.auth));
    } 

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    onClickLogout() {
        this.props.dispatch(actions.logoutUser(this.props.location.query.auth));
    }
    onSubmitNextQuestion (event) {
        event.preventDefault();
        this.props.dispatch(actions.fetchNextQuestion(this.props.location.query.auth, this.props.isCorrect));
    }
    showResult() {
        if(this.props.showNextQuestionButton === true) {
            return <CardNext 
                    onSubmitNextQuestion={ this.onSubmitNextQuestion }
                    currentAnswerInput={ this.props.currentAnswerInput }
                    />
        }
        else {
            return <CardAnswer/>;
        }
    }
    render() {
        return (
            <MuiThemeProvider>
                <div id="main-page">
                    <div id="top-level-component">
                        <Score 
                            score={this.props.score}
                        />
                        <Logout 
                            onClickLogout={ this.onClickLogout }
                        />
                        <Question 
                            currentQuestion={ this.props.currentQuestion }
                            showNextQuestionButton={ this.props.showNextQuestionButton }
                            currentFeedback={ this.props.currentFeedback }
                            correctAnswer={ this.props.correctAnswer }
                            isCorrect={ this.props.isCorrect }
                        />
                        { this.showResult() }
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

};

export default connect(
    ({ currentQuestion, currentAnswerInput, showNextQuestionButton, currentFeedback, isCorrect, submitBoxShow, correctAnswer, score }) => ({ currentQuestion, currentAnswerInput, showNextQuestionButton, currentFeedback, isCorrect, submitBoxShow, correctAnswer, score })
)(App);