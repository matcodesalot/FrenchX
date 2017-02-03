import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../action/actions';

//child components
import LeftCard from './LeftCard';
import RightCard from './RightCard';
import Logout from './Logout';
import Score from './Score';

//google material UI theme provider 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
    constructor(props) {
        super(props);
        this.onClickLogout = this.onClickLogout.bind(this);
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
    render() {
        return (
            <MuiThemeProvider>
                <div id="main-page">
                    <div id="top-level-component">
                        <Logout 
                            onClickLogout={ this.onClickLogout }
                        />
                        <LeftCard 
                            currentQuestion={ this.props.currentQuestion }
                            showNextQuestionButton={ this.props.showNextQuestionButton }
                            currentFeedback={ this.props.currentFeedback }
                            correctAnswer={ this.props.correctAnswer }
                            isCorrect={ this.props.isCorrect }
                        />
                        <RightCard 
                            showNextQuestionButton={this.props.showNextQuestionButton}
                            isCorrect={this.props.isCorrect}
                            currentAnswerInput={this.props.currentAnswerInput}
                            query={this.props.location.query.auth}

                        />
                        <Score 
                            score={ this.props.score }
                        />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

};

export default connect(
    ({ currentQuestion, currentAnswerInput, showNextQuestionButton, currentFeedback, isCorrect, submitBoxShow, correctAnswer, score }) => ({ currentQuestion, currentAnswerInput, showNextQuestionButton, currentFeedback, isCorrect, submitBoxShow, correctAnswer, score })
)(App);