var express = require('express');
var router = express.Router();
var models = require('../models/');
var Page = models.Page;
var User = models.User;
module.exports = router;

router.get('/', function(req, res, next){
	res.redirect('/');
})

router.post('/', function(req, res, next){
	var page = new Page({
		title: req.body.title,
		content: req.body.content
	});
	console.log(page);
	page.save().then(function(succcess){
		console.log('inside save callback');
		res.redirect('/');

	}, function(error){res.render('error', {error: error, message: "Save unsuccessful"})});
})

router.get('/add', function(req, res, next){
	res.render('addpage');
})