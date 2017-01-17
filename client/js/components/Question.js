import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';



export default ({ currentQuestion, showNextQuestionButton, currentFeedback, isCorrect, correctAnswer }) => {
    console.log(typeof isCorrect)
    if (!currentQuestion) {
        return (
            <div id = "french" className = "top-half half-width">
                <h1 id = "french-heading" className = "language">French</h1>
            </div>
        )
    }
    if (!showNextQuestionButton) {
        return (
            <div id = "french" className = "top-half half-width">
                <h1 id = "french-heading" className = "language">French</h1>
                    <div>
                        <div className="card">
                            <Card zDepth={5}>
                                <CardHeader
                                  className="card-question"
                                  title={currentQuestion}
                                />
                            </Card>
                        </div>
                    </div>
            </div>
        );
    } 
    return (
        <div id = "french" className = "top-half half-width">
            <h1 id = "french-heading" className = "language">French</h1>
                <div>
                    <div className="card">
                        <Card>
                            <CardHeader
                                className="card-feedback"
                                title={currentFeedback}
                            />
                            <CardText>
                              {(isCorrect === false) ? "Correct Answer: " + correctAnswer : ""}
                            </CardText>
                        </Card>
                    </div>
                </div>
        </div>
    );

}