var React = require("react");
var connect = require("react-redux").connect;
var RegisterLogIn = require("./RegisterLogIn");

var Homepage = React.createClass({
    render: function(){
        return (
            <div id = "homepage">
                <h1>French X</h1>
                <h2>Learn Languages Through Spaced Repetition</h2>
                <RegisterLogIn />
            </div>
        );
    }

});