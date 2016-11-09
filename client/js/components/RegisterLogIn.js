var React = require("react");
var Link = require('react-router').Link;

var connect = require("react-redux").connect;

var RegisterLogIn = React.createClass({

    render: function(){
        return (
            <div id = "register-login">
                <button id = "register-login-button" ><Link to="/home">Register/Log In with Google</Link></button>
            </div>
        );
    }

});

module.exports = RegisterLogIn;