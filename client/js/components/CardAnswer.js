import React, { Component } from 'react';
import English from './English';
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

class CardAnswer extends Component {
	constructor(props) {
	    super(props);
	    this.onSubmitAnswer = this.onSubmitAnswer.bind(this);
	}
	onSubmitAnswer (event) {
        event.preventDefault();
        this.props.dispatch(actions.submitAnswer(this.refs.answerInput.input.value));
        this.refs.answerInput.input.value = "";
    }
	render () {
		return (
			<div id="english" className="bottom-half half-width">
			    <English />
			    <form onSubmit={ this.onSubmitAnswer }>
			        <div className="card">
			            <Card zDepth={5}>
			                <CardHeader
			                    className="card-answer"
			                >
			                    <TextField
			                      floatingLabelText="What is it in English?"
			                      hintText="Type answer here"
			                      ref="answerInput"
			                      type="text"
			                      required={ true }
			                      autoFocus={ true }
			                    />
			                </CardHeader>
			                <CardActions>
			                    <RaisedButton
			                        label="Submit"
			                        labelPosition="before"
			                        containerElement="label"
			                        className="hide show"
			                        onClick={ this.onSubmitAnswer }
			                    />
			                </CardActions>
			            </Card>
			        </div>
			    </form>
			</div>
		)
	}
}

export default connect()(CardAnswer);