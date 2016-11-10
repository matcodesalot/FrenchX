var React = require("react");
var Link = require('react-router').Link;

// var RegisterLogIn = require("./RegisterLogIn");




var Homepage = React.createClass({
    render: function(){
        return (
            <div id = "homepage">
                <div id ="homepage-text">
                    <h1>French X</h1>
                    <h2>Learn Languages Through Space Repetition</h2>
                </div>
                <div id = "register-login">
                	<button id = "register-login-button" ><Link to="/home">Register/Log In with Google</Link></button>
                </div>
            </div>
        );
    }

});

module.exports = Homepage