var questionReducer = require('./reducers/reducers');
var createStore = require('redux').createStore;
var actions = require('./action/actions');
var applyMiddleware = require('redux').applyMiddleware;
var thunk = require('redux-thunk');

var store = createStore(questionReducer);

store.dispatch(actions.fetchQuestion("Bonjour"));
store.dispatch(actions.submitAnswer(5));

store.dispatch(actions.generateFeedback());

console.log(store.getState());

module.exports = store;
