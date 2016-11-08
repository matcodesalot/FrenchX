var React = require("react");
var Question = require("./Question");
var Answer = require("./Answer");
var connect = require('react-redux').connect;

//make app function that renders jsx element
var App = React.createClass({

    render: function(){
        

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
    }

});

function mapStateToProps(state) {
    return {
        currentAnswerInput: state.currentAnswerInput
    }
}
module.exports = App;