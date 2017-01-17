import React from 'react';
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
};