var React = require('react');

var Question = function(props) {
    if (!props || !props.currentQuestion) {
        return (
            <div id = "french" className = "top-half half-width">
                <h1 id = "french-heading" className ="language">French</h1>
            </div>
        )
    }

    if (!props.showNextQuestionButton) {
        return (
            <div id = "french" className = "top-half half-width">
                <h1 id = "french-heading" className ="language">French</h1>
                    <div className="frenchWord">
                            {props.currentQuestion}
                    </div>
            </div>
        );
    }

    return (
        <div id = "french" className = "top-half half-width">
            <h1 id = "french-heading" className ="language">French</h1>
                <div className="frenchWord">
                        {props.currentFeedback}
                </div>
        </div>
    );

}


module.exports = Question;