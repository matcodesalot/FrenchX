import React from 'react';

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
                    <div className = "frenchWord">
                            {currentQuestion}
                    </div>
            </div>
        );
    }
    return (
        <div id = "french" className = "top-half half-width">
            <h1 id = "french-heading" className = "language">French</h1>
                <div className = "frenchWord">
                        {currentFeedback}
                </div>
        </div>
    );

}