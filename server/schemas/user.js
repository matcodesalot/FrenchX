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

			console.log('user after access_token updated', user);

			return callback(null, user);
		}
		//create a user
		this.create({googleId: userInfo.googleId, access_token: userInfo.access_token, queue: seedData()}, (err, user) => {
			if(err) return callback(err);
			console.log('user created in db');
			return callback(null, user);
		});
	});
};

module.exports = mongoose.model('User', UserSchema);