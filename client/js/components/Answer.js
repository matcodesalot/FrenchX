var React = require('react');
var ReactDOM = require('react-dom');

var Answer = React.createClass({
  getInitialState: function(props) {
    return {
     value: "Hello!"
    };
  },
  
  handleChange: function(e) {
    this.setState({
      value: e.target.value
    });
  },
  
  render: function() {
    return (
        <div>
            <h1>English</h1>
            <input value={this.state.value} onChange={this.handleChange} />
        </div>
    );
  }
});

module.exports = Answer;