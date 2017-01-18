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
		        style={{
    				boxShadow: "0 0 1em #000",
    				marginTop: "2%",
    			}}
		    />
		</div>
	);
};