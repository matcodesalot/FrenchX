require('babel-polyfill'); 
var React = require("react"); 
var ReactDOM = require("react-dom"); 
var App = require("./components/App");
var store = require("./store");
var Provider = require('react-redux').Provider;

var actions = require('./action/actions');
var applyMiddleware = require('redux').applyMiddleware;
var thunk = require('redux-thunk');

//Router imports
var router = require('react-router');
var Route = router.Route;
var Router = router.Router;
var browserHistory = router.browserHistory;
var hashHistory = router.hashHistory;
// var IndexRouter = router.IndxRoute
var Link = router.Link;

var routes = (
	<Router history={browserHistory}>
		<Route path='/' component={App}></Route>
	</Router>
);

	//homepage should display company banner and login button
		// <Route path="/" component={Homepage}>
		// 	//clicking login button and sucessfully login should direct user to /home
		// 	//which displays the questions
		// 	<Route path="/home" component={App} />
		// </Route>

//with routes:
document.addEventListener("DOMContentLoaded", function() { 
	ReactDOM.render(<Provider store={store}>{routes}</Provider>, document.getElementById("app")); 
});



//without routes:
// document.addEventListener("DOMContentLoaded", function() { 
// 	ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("app")); 
// });


module.exports = store;