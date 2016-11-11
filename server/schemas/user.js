// import {seedData} from '../factories/utils';

var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	googleId: {
		type: String,
		required: true,
		unique: true
	},
	access_token: {
		type: String,
		required: true,
		unique: true
	},
	//handles each user queue as well as weight
	queue: [{
		question: String,
		answer: String,
		weight: Number
	}]
});



module.exports = mongoose.model('User', UserSchema);