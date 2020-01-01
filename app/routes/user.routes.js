module.exports = (app) => {
	const users = require('../controllers/user.controller.js');

	//register a new user
	app.post('/register', users.register);

	//get all users
	app.get('/users',users.getUsers);

}