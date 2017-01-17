import mongoose from 'mongoose';

const questionSchema = {
	question: String,
	answer: String,
	weight: Number
}

const UserSchema = new mongoose.Schema({
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
	score: {
		type: Number
	},
	queue: [questionSchema]
});

export default mongoose.model('User', UserSchema);