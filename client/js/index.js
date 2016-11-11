require('babel-polyfill'); 
var React = require("react"); 
var ReactDOM = require("react-dom"); 
var App = require("./components/App");
var Homepage = require("./components/Homepage")
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
		
		<Route path="/" component={Homepage}/>
		<Route path="/home" component={App}/>
	</Router>
)


document.addEventListener("DOMContentLoaded", function() { 
	ReactDOM.render(<Provider store={store}>{routes}</Provider>, document.getElementById("app")); 
});



module.exports = store;