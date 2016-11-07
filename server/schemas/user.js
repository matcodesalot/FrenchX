var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({

	//save google token
	//that token is what you're going to pass to every endpoint you create
	email: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('User', UserSchema);
