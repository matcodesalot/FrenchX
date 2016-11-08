var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;

var French = function(prop) {
   return (
    <div className="frenchWord">
        {prop.frenchWord}
    </div>
    );
};

var Question = React.createClass({
    render: function() {
        return (
            <div>
                <h1>French</h1>
                <French frenchWord={this.props.currentQuestion} />
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        currentQuestion: state.currentQuestion
    }
}

module.exports = connect(mapStateToProps)(Question);