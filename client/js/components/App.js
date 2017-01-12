import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Question from './Question';
import * as actions from '../action/actions';

import English from './English';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickLogout = this.onClickLogout.bind(this);
    }

    componentDidMount () {
        this.props.dispatch(actions.fetchNextQuestion(this.props.location.query.auth));
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    onSubmit (event) {
        event.preventDefault();
        this.props.dispatch(actions.submitAnswer(this.refs.answerInput.value));
        this.refs.answerInput.value = "";
   }

   onClickLogout() {
        this.props.dispatch(actions.logoutUser(this.props.location.query.auth));
   }

    showResult() {
        if(this.props.showNextQuestionButton === true) {
            return (
                <div  id = "english" className = "bottom-half half-width">
                    <English />
                    <RaisedButton
                        label="Next"
                        labelPosition="before"
                        containerElement="label"
                        className="hide show"
                        onClick={
                            e => this.props.dispatch(actions.fetchNextQuestion(this.props.location.query.auth, this.props.isCorrect))
                        }
                    />
                </div>
            )
        }
        else {
            return (
                <div  id = "english" className = "bottom-half half-width">
                    <English />
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <input id ="answer-input" type="text" ref="answerInput" />
                            <RaisedButton
                                label="Submit"
                                labelPosition="before"
                                containerElement="label"
                                className="hide show"
                                onClick={this.onSubmit}
                            />
                        </form>
                    </div>
                </div>
            );
        }
    }

    render() {
        const styles = {
          button: {
            position: 'absolute',
            'margin-top': '5vw'
          }
        }
        return (
            <MuiThemeProvider>
                <div id="top-level-component">
                    <h1>French X</h1>
                    <div>
                        <RaisedButton
                            label="Logout"
                            href="/"
                            labelPosition="before"
                            containerElement="label"
                            className="hide show"
                            onClick={this.onClickLogout}
                            style={styles.button}
                        />
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
            </MuiThemeProvider>
        );
    }

};

export default connect(
    ({ currentQuestion, currentAnswerInput, showNextQuestionButton, currentFeedback, isCorrect, accessToken, submitBoxShow }) => ({ currentQuestion, currentAnswerInput, showNextQuestionButton, currentFeedback, isCorrect, accessToken, submitBoxShow })
)(App);