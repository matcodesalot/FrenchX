import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';



export default ({ currentQuestion, showNextQuestionButton, currentFeedback }) => {
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
                            <Card>
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
                        </Card>
                    </div>
                </div>
        </div>
    );

}