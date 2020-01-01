const express = require('express');
const bodyParser = require('body-parser');

//CORS allows AJAX requests to skip a policy and access resources from remote hosts
var cors = require('cors');

// create express app
const app = express();

//create path
const path = require('path');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//use the public folder to access pages
app.use(express.static('public'));

// Require Notes routes
require('./app/routes/note.routes.js')(app);
require('./app/routes/user.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});