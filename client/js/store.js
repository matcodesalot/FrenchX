import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import questionReducer from './reducers/reducers';


let store = createStore(
	questionReducer, 
	applyMiddleware(thunk)
);

export default store;
