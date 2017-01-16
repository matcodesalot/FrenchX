import React from 'react';
import English from './English';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


const style = {
    cardNext : {
        opacity : "1 !important"
    }
}

export default ({ onSubmitNextQuestion, currentAnswerInput }) => {
	return (
		<div id="english" className="bottom-half half-width">
		    <English />
		    <form onSubmit={onSubmitNextQuestion}>
		        <div className="card">
		            <Card>
		                <CardHeader
		                    className="card-next"
		                >
		                    <TextField
		                      hintText={ currentAnswerInput }
		                      defaultValue={ currentAnswerInput }
		                      floatingLabelText="What is it in English?"
		                      style={ style.cardNext}
		                      disabled={ true }
		                    />
		                </CardHeader>
		                <CardActions>
		                    <RaisedButton
		                        label="Next"
		                        labelPosition="before"
		                        containerElement="label"
		                        className="hide show"
		                        onClick={ onSubmitNextQuestion }
		                    />
		                </CardActions>
		            </Card>
		        </div>
		    </form>
		</div>
	)
}