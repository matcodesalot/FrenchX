var questionReducer = require('./reducers/reducers');
var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var thunk = require('redux-thunk').default;


var store = createStore(questionReducer, applyMiddleware(thunk));

module.exports = store;
