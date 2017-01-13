import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RegisterLogin from './RegisterLogin';
import HomepageText from './Title';

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