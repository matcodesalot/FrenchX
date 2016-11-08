require('babel-polyfill'); 
var React = require("react"); 
var ReactDOM = require("react-dom"); 
var App = require("./components/App");
var store = require("./store");
import { Provider } from 'react-redux';

var questionReducer = require('./reducers/reducers');
var createStore = require('redux').createStore;
var actions = require('./action/actions');
var applyMiddleware = require('redux').applyMiddleware;
var thunk = require('redux-thunk');

var store = createStore(questionReducer);


document.addEventListener("DOMContentLoaded", function() { 
	ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("app")); 
});


module.exports = store;