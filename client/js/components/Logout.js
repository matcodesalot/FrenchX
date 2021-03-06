import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
	button: {
		'marginTop': '5vw'
	}
}

export default ({ onClickLogout }) => {
	return (
		<header id="logout-button">
		    <h1>French X</h1>
		    <RaisedButton
		        label="Logout"
		        labelPosition="before"
		        containerElement="label"
		        className="hide show"
		        onClick={ onClickLogout }
		        style={ styles.button }
		    />
		</header>
	);
}