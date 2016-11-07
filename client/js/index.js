require('babel-polyfill');
var React = require("react");
var ReactDOM = require("react-dom");
var App = require("./components/App");

document.addEventListener("DOMContentLoaded", function() {
    ReactDOM.render(<App />,document.getElementById("app"));
});



console.log(`Client running in ${process.env.NODE_ENV} mode`);
