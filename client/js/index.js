require('babel-polyfill'); 
var React = require("react"); 
var ReactDOM = require("react-dom"); 
var App = require("./components/App");
var store = require("./store");
import { Provider } from 'react-redux';


document.addEventListener("DOMContentLoaded", function() { 
	ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("app")); 
});
