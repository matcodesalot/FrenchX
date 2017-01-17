import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomepageText from './Title';
import RaisedButton from 'material-ui/RaisedButton';
const FontAwesome = require('react-fontawesome');

export default () => {
    return (
        <MuiThemeProvider>
            <div id = "homepage">
                <HomepageText />
                <div id = "register-login">
                    <RaisedButton
                        href="/auth/google"
                        label={"Sign in with"}
                        labelPosition="before"
                        icon={<FontAwesome name='google'/>}
                    />
                </div>
            </div>
        </MuiThemeProvider>
    )
};