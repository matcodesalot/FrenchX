import {seedData} from '../factories/utils';

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

UserSchema.statics.findOrCreate = function(userInfo, callback) {
	this.findOne({googleId: userInfo.googleId}, (err, user) => {
		if(err) return callback(err);
		if (user) {
			this.findOneAndUpdate(
				{
					googleId: userInfo.googleId
				},
				{
					access_token: userInfo.access_token
				}
			)
			return callback(null, user);
		}
		//create a user
		this.create({googleId: userInfo.googleId, access_token: userInfo.access_token, queue: seedData()}, (err, user) => {
			if(err) return callback(err);
			return callback(null, user);
		});
	});
};

module.exports = mongoose.model('User', UserSchema);