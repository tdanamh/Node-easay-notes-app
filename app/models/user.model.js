const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UsersSchema);