require('babel-polyfill'); 
var React = require("react"); 
var ReactDOM = require("react-dom"); 
// var App = require("./components/App");
import App from './components/App';
// var Homepage = require("./components/Homepage")
import Homepage from './components/Homepage';

var Provider = require('react-redux').Provider;

var actions = require('./action/actions');
var applyMiddleware = require('redux').applyMiddleware;
var thunk = require('redux-thunk');

var store = require("./store");

//Router imports
var router = require('react-router');
var Route = router.Route;
var Router = router.Router;
var browserHistory = router.browserHistory;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;


var getRoutes = (
		<Router history={browserHistory}>
			<Route path="/">
				<IndexRoute component={Homepage}/>
				<Route path="home" component={App}/>
			</Route>
		</Router>	
	)





document.addEventListener(
	'DOMContentLoaded', 
	function() { 
		ReactDOM.render(
			<Provider store={store}>
				{getRoutes}
			</Provider>, 
			document.getElementById('app')
	)}
);



module.exports = store;