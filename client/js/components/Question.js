var React = require('react');
var ReactDOM = require('react-dom');
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
                <French frenchWord={/*this.frenchWord*/"je suis"} />
            </div>
        );
    }
});
module.exports = Question;