require('babel-polyfill'); 
var React = require("react"); 
var ReactDOM = require("react-dom"); 
var App = require("./components/App");
var store = require("./store");
import { Provider } from 'react-redux';
//var Provider = require('react-redux').Provider;

var actions = require('./action/actions');
var applyMiddleware = require('redux').applyMiddleware;
var thunk = require('redux-thunk');



document.addEventListener("DOMContentLoaded", function() { 
	ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("app")); 
});


module.exports = store;