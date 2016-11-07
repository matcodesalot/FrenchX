var React = require("react");
var Question = require("./Question");
var Answer = require("./Answer");
//make app function that renders jsx element
var App = function(){
    return (
    <div>
        <h1>French X</h1>
        <div>
            <Question />
        </div>
        <div>
            <Answer />
        </div>
    </div>
    );
};
module.exports = App;