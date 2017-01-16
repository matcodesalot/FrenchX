import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Homepage from './components/Homepage';
import { Provider } from 'react-redux';
import actions from './action/actions';
import store from './store';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';

const getRoutes = (
		<Router history={browserHistory}>
			<Route path="/">
					<IndexRoute component={Homepage}/>
					<Route path="home" component={App}/>
			</Route>
		</Router>	
);

document.addEventListener(
	'DOMContentLoaded', 
	() => { 
		ReactDOM.render(
			<Provider store={store}>
				{getRoutes}
			</Provider>, 
			document.getElementById('app')
	)}
);