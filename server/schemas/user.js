import {seedData} from '../factories/utils';

var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	//save google token
	//that token is what you're going to pass to every endpoint you create
	googleId: {
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

UserSchema.statics.findOrCreate = function(googleId, callback) {
	this.findOne({googleId}, (err, user) => {
		if(err) return callback(err);
		if (user) {
			return callback(null, user);
		}
		//create a user
		this.create({googleId, queue: seedData()}, (err, user) => {
			if(err) return callback(err);
			
			return callback(null, user);
		});
	});
};

module.exports = mongoose.model('User', UserSchema);
