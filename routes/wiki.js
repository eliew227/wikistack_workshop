var express = require('express');
var router = express.Router();
var models = require('../models/');
var Page = models.Page;
var User = models.User;
module.exports = router;

var errorFunc = 

router.get('/', function(req, res, next) {
    Page.find().exec().then(
    	function(pages){
    		console.log(pages);
    		res.render('index', {pages: pages});
    	},
        function(error) {
            res.render('error', {
                error: error,
                message: "Save unsuccessful"
            });
        });
});

router.post('/', function(req, res, next) {
    var page = new Page({
        title: req.body.title,
        content: req.body.content
    });
    page.save()
        .then(function(success) {
                res.redirect('/wiki/' + success.urlTitle);
            }, 
            errorFunc
        );
});

router.get('/add', function(req, res, next) {
    res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next) {
    Page.findOne({urlTitle: req.params.urlTitle}).exec()
    .then(function (page) {
    	res.render('wikipage', page);
    })
    .then(null, next);
});