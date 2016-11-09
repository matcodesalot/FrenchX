var React = require("react");
var connect = require("react-redux").connect;

var RegisterLogIn = React.createClass({
    render: function(){
        return (
            <div id = "register-login">
                <button id = "register-login-button">Register/Log In with Google</button>
            </div>
        );
    }

});

module.exports = RegisterLogIn;