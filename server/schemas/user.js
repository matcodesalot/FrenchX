var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	//save google token
	//that token is what you're going to pass to every endpoint you create
	email: {
		type: String,
		required: true,
		unique: true
	},
	googleId: {
		type: String,
		required: true
	},
	//handles each user queue as well as weight
	queue: [{
		question: String,
		answer: String,
		weight: Number
	}]
});

UserSchema.statics.findOrCreate = function(user, callback) {
	this.findOne(user, (err, user) => {
		if(err) return callback(err);
		if (!user) {
			//create a user
			this.create(user, (err, user) => {
				if(err) return callback(err);
				return callback(null, user);
			})
		}
		return callback(null, user);
	});
};

module.exports = mongoose.model('User', UserSchema);
