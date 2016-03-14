'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var bodyParser = require('body-parser');
var makesRouter = require('./routes');
var path = require('path');
// var fs = require('fs');
// var mime = require('mime');
// var socketio = require('socket.io');

// templating boilerplate setup
app.set('views', path.join(__dirname, '/views')); // where to find the views
app.set('view engine', 'html'); // what file extension do our templates have
app.engine('html', swig.renderFile); // how to render html templates
swig.setDefaults({ cache: false });

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


// modular routing that uses io inside it
// app.use('/', makesRouter(io));

// the typical way to use express static middleware.
app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000, function(){
	console.log('Listening on port 3000');
});