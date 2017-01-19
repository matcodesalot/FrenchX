import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';



export default ({ currentQuestion, showNextQuestionButton, currentFeedback, isCorrect, correctAnswer }) => {
    const renderQuestionOrFeedback = () => {
        if (!currentQuestion) return;
        if (!showNextQuestionButton) {
            return (
                <CardHeader
                  className="card-header card-question"
                  title={currentQuestion}
                />
            );
        } 
        return (
            <div id="feedback">
                <CardHeader
                    className="card-feedback"
                    title={currentFeedback}
                />
                <CardText>
                  {(isCorrect === false) ? "Correct Answer: " + correctAnswer : ""}
                </CardText>
            </div>
        );
    }
    return (
        <div id = "french" className = "top-half half-width">
            <h1 id = "french-heading" className = "language">French</h1>
            <div className="card">
                <Card className="card-header">
                    {renderQuestionOrFeedback()}
                </Card>
             </div>
        </div>
    )
}