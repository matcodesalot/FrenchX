import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Question from './Question';
import * as actions from '../action/actions';

import English from './English';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const style = {
    cardNext : {
        opacity : "1 !important"
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickLogout = this.onClickLogout.bind(this);
        this.onSubmitNextQuestion = this.onSubmitNextQuestion.bind(this);
    }

    componentDidMount () {
        this.props.dispatch(actions.fetchNextQuestion(this.props.location.query.auth));
    } 

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    onSubmit (event) {
        event.preventDefault();
        this.props.dispatch(actions.submitAnswer(this.refs.answerInput.input.value));
        this.refs.answerInput.input.value = "";
    }

    onClickLogout() {
        this.props.dispatch(actions.logoutUser(this.props.location.query.auth));
    }
    onSubmitNextQuestion (event) {
        event.preventDefault();
        this.props.dispatch(actions.fetchNextQuestion(this.props.location.query.auth, this.props.isCorrect));
    }

    showResult() {
        console.log(2, this.props.currentAnswerInput)
        if(this.props.showNextQuestionButton === true) {
            return (
                <div  id = "english" className = "bottom-half half-width">
                    <English />
                    <form onSubmit={this.onSubmitNextQuestion}>
                        <div className="card">
                            <Card>
                                <CardHeader
                                    className="card-next"
                                >
                                    <TextField
                                      hintText={this.props.currentAnswerInput}
                                      defaultValue={this.props.currentAnswerInput}
                                      floatingLabelText="What is it in English?"
                                      style={style.cardNext}
                                      disabled={true}
                                    />
                                </CardHeader>
                                <CardActions>
                                    <RaisedButton
                                        label="Next"
                                        labelPosition="before"
                                        containerElement="label"
                                        className="hide show"
                                        onClick={this.onSubmitNextQuestion}
                                    />
                                </CardActions>
                            </Card>
                        </div>
                    </form>
                </div>
            )
        }
        else {
            console.log(this.refs.answerInput)
            return (
                <div  id = "english" className = "bottom-half half-width">
                    <English />
                    <form onSubmit={this.onSubmit}>
                        <div className="card">
                            <Card>
                                <CardHeader
                                    className="card-answer"
                                >
                                    <TextField
                                      floatingLabelText="What is it in English?"
                                      hintText="Type answer here"
                                      ref="answerInput"
                                      type="text"
                                      required={true}
                                    />
                                </CardHeader>
                                <CardActions>
                                    <RaisedButton
                                        label="Submit"
                                        labelPosition="before"
                                        containerElement="label"
                                        className="hide show"
                                        onClick={this.onSubmit}
                                    />
                                </CardActions>
                            </Card>
                        </div>
                    </form>
                </div>
            );
        }
    }

    render() {
        const styles = {
          button: {
            'margin-top': '5vw'
          }
        }
        return (
            <MuiThemeProvider>
                <div id="main-page">
                    <div id="top-level-component">
                        <header id="logout-button">
                            <h1>French X</h1>
                            <RaisedButton
                                label="Logout"
                                href="/"
                                labelPosition="before"
                                containerElement="label"
                                className="hide show"
                                onClick={this.onClickLogout}
                                style={styles.button}
                            />
                        </header>
                        <div>
                            <Question 
                                currentQuestion={this.props.currentQuestion}
                                showNextQuestionButton={this.props.showNextQuestionButton}
                                currentFeedback={this.props.currentFeedback}
                            />
                        </div>
                        {this.showResult()}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

};

export default connect(
    ({ currentQuestion, currentAnswerInput, showNextQuestionButton, currentFeedback, isCorrect, submitBoxShow }) => ({ currentQuestion, currentAnswerInput, showNextQuestionButton, currentFeedback, isCorrect, submitBoxShow })
)(App);