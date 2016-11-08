var React = require('react');
var ReactDOM = require('react-dom');
var submitAnswer = require("../action/actions");
var connect = require('react-redux').connect;



var Answer = React.createClass({
   onSubmit: function (event) {
        event.preventDefault();
        this.props.onAddSubmit(this.refs.answerInput.value);
        this.refs.answerInput.value = "";
   },
  
  render: function() {
    return (
        <div>
            <h1>English</h1>
            <form>
              <input type="text" ref="answerInput" />
              <input type="submit" value="Submit" onSubmit={this.onSubmit}/>
            </form>
        </div>
    );
  }
});

function mapDispatchToProps(dispatch) {
    return {
        onAddSubmit: function(answerInput) {
            dispatch(submitAnswer(answerInput));
        }
    };
}

module.exports = connect(mapDispatchToProps)(Answer);
