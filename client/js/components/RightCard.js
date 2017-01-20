import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as actions from '../action/actions';
import { connect } from 'react-redux';


const style = {
    cardNext : {
        opacity : "1 !important"
    }
}

class RightCard extends Component {
	constructor(props) {
	    super(props);
	    this.onSubmitAnswer = this.onSubmitAnswer.bind(this);
	    this.onSubmitNextQuestion = this.onSubmitNextQuestion.bind(this);
	}
	onSubmitAnswer (event) {
        event.preventDefault();
        this.props.dispatch(actions.submitAnswer(this.refs.answerInput.input.value));
        this.refs.answerInput.input.value = "";
    }
    onSubmitNextQuestion (event) {
        event.preventDefault();
        this.props.dispatch(actions.fetchNextQuestion(this.props.query, this.props.isCorrect));
    }
    componentDidUpdate() {
    	if(this.props.showNextQuestionButton !== true) {
    		this.refs.answerInput.input.focus();
    	}
    }
    renderCard(onSubmitMethod, hintText, refInput, buttonName) {
		return (
        	<form onSubmit={ onSubmitMethod }>
		        <div className="card">
		            <Card className="card-header">
			            <CardHeader
			                className={ "card-" + buttonName }
			            >
			                <TextField
			                  floatingLabelText="What is it in English?"
			                  hintText={ hintText }
			                  ref={ refInput }
			                  style={ style.cardNext}
			                  required={ true }
			                  autoFocus={ true }
			                  disabled={ this.props.showNextQuestionButton }
							/>
			            </CardHeader>
			            <CardActions>
			                <RaisedButton
			                	label={ buttonName }
			                    labelPosition="before"
			                    containerElement="label"
			                    className="hide show"
			                    ref={ "refButton" }
			                    onClick={ onSubmitMethod }
			                >
			                { ( this.props.showNextQuestionButton === true ) ?  <input autoFocus id="next-button" type="button" required /> : '' }
			                </RaisedButton>
			                { ( this.props.showNextQuestionButton === true ) ?  <span id="move-on">(Press 'Enter' to move on.)</span> : '' }
			            </CardActions>
		            </Card>
				</div>
			</form>
		);
    }
    checkShowNextOrAnswerInput() {
        if(this.props.showNextQuestionButton === true) {
        	return this.renderCard(this.onSubmitNextQuestion, this.props.currentAnswerInput, "", "next", "nextButton")
        }
        else {
        	return this.renderCard(this.onSubmitAnswer, "Type answer here", "answerInput", "submit");
        }
    }
	render () {
		return (
			<div id="english" className="bottom-half half-width">
			    <h1 id = "english-heading" className = "language">English</h1>
			    { this.checkShowNextOrAnswerInput() }
			</div>
		);
	}
}

export default connect()(RightCard);