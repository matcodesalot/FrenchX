var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true
	},
	answer: {
		type: String,
		required: true
	},
	//weight starts at a value of 1
	weight: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Question', QuestionSchema);