// import {seedData} from '../factories/utils';

let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({
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



export default mongoose.model('User', UserSchema);