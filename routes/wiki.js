var express = require('express');
var router = express.Router();
var models = require('../models/');
var Page = models.Page;
var User = models.User;
module.exports = router;

var errorFunc = function(error) {
    res.render('error', {
        error: error,
        message: "Unsuccessful!"
    });
}

router.get('/', function(req, res, next) {
    Page.find().exec().then(
        function(pages){
            //console.log(pages);
            res.render('index', {pages: pages});
        }, errorFunc);
});

router.post('/', function(req, res, next) {
    User.findOrCreate(req.body.email, req.body.name).then(function(userreturned){
        console.log('in user returned');
        console.log(userreturned);
        var page = new Page({
            title: req.body.title,
            content: req.body.content,
            tag: req.body.tags.split(' '),
            author: userreturned._id
        });
        page.save()
            .then(function(success) {
                    res.redirect('/wiki/' + success.urlTitle);
                }, errorFunc);
    }, errorFunc)
});

router.get('/add', function(req, res, next) {
    res.render('addpage');
});

router.get('/search', function(req,res,next){
    Page.findByTag(req.query.tag)
    .then(function(searchHits){
        res.render('index', {pages: searchHits});
    }, errorFunc);
});

router.get('/:urlTitle/similar', function(req, res, next) {
    var urlTitle = req.params.urlTitle;
    Page.findBySimilarTag(urlTitle)
    .then(function(searchHits){
        res.render('index', {pages: searchHits});
    }, errorFunc);
});

router.get('/:urlTitle', function(req, res, next) {
    
    Page.findOne({urlTitle: req.params.urlTitle}).populate('author')
    .exec().then(function (page) {
        var pageTagString = page.tag.join(' ');    
        res.render('wikipage',{tags: pageTagString, page: page});  
    }, errorFunc);

});

