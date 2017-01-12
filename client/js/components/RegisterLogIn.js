var React = require("react");
var Link = require('react-router').Link;
import ActionAndroid from 'material-ui/svg-icons/action/android';
import RaisedButton from 'material-ui/RaisedButton';

const FontAwesome = require('react-fontawesome');

export default () => {
	return (
		<div id = "register-login">
		    <RaisedButton
		        href="/auth/google"
		        label={"Sign in with"}
		        labelPosition="before"
		        icon={<FontAwesome name='google'/>}
		    />
		</div>
	)
}

// var RegisterLogIn = React.createClass({

//     render: function(){
//         return (
//             <div id = "register-login">
//                 <button id = "register-login-button" ><Link to="/home">Register/Log In with Google</Link></button>
//             </div>
//         );
//     }

// });

// module.exports = RegisterLogIn;