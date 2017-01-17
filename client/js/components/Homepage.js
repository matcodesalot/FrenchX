import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomepageText from './Title';
import RegisterLogin from './RegisterLogin';

export default () => {
    return (
        <MuiThemeProvider>
            <div id = "homepage">
                <HomepageText />
                <RegisterLogin />
            </div>
        </MuiThemeProvider>
    )
};