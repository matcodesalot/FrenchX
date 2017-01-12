import React from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RegisterLogin from './RegisterLogin';
import HomepageText from './Title';

var Homepage = React.createClass({
    render: function(){
        return (
            <MuiThemeProvider>
                <div id = "homepage">
                    <HomepageText />
                    <RegisterLogin />
                </div>
            </MuiThemeProvider>
        );
    }

});

export default Homepage;