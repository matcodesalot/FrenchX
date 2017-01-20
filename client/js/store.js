import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import questionReducer from './reducers/reducers';

export default createStore(questionReducer, applyMiddleware(thunk));