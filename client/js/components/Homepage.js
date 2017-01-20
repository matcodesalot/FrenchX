import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomepageText from './Title';
import RaisedButton from 'material-ui/RaisedButton';
import FontAwesome from 'react-fontawesome';

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
                        icon={ <FontAwesome name='google'/> }
                    />
                </div>
                <footer className="footer">
                    <p>Made by world class developers and patriots for the Republic, Lavie, Mat, and Beatrix</p>
                </footer>
            </div>
        </MuiThemeProvider>
    );
};