var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
var mongoose = require('mongoose');
var Promise = require("bluebird");

// Assign Mongoose promise
mongoose.Promise = Promise;
// Mongodb models
var Articles = require("../models/model.js");
var Comments =require('../models/model2.js')
// Website To Be Scraped
var url = "https://www.coindesk.com/";
router.get('/', function(req, res){
  res.render('index');
});
router.get('/articles', function(req, res){
    request(url, function(error, response, html) {  
        var $ = cheerio.load(html);
    var result = [];
    // Scrape website
$(".article").each(function(i, element) {
        var title = $(element).find('.picture').find("a").attr("title");
        var imgLink = $(element).find('.picture').find("a").find("img").attr("src");
        var storyLink = $(element).find(".post-info").find("a").attr("href");
        var summary = $(element).find(".post-info").find("p").text();
        summary = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        if(summary===''){
          return;
        }else{
        result[i] = ({ 
        title: title,
        imgLink: imgLink,
        storyLink: storyLink,
        summary: summary
      }); 
      }
  });
res.render('index',{articles:result});  
}); 
});
router.post('/save', function(req, res){
    article = { 
        title: req.body.title,
        storyLink: req.body.storyLink,
        summary: req.body.summary
      };
      console.log(article);
    Articles.findOne({'title': req.body.title}, function(err, articleRecord) {
        if(err) {
          console.log(err);
        } else {
          if(articleRecord == null) {
            Articles.create(article, function(err, record) {
              if(err) throw err;
              console.log("Record Added");
            });
          } else {
            console.log("No Record Added");
          }         
        }
      });
});

// Get all current articles in database
router.get('/articlesaved', function(req, res){
  Articles.find().sort({ createdAt: -1 }).exec(function(err, data) { 
    if(err) throw err;
    res.render('index',{articles:data});
  });
});

// Get all comments for one article
router.get('/comments/:id', function(req, res){
  Articles.find({'articleId': req.params.id}).exec(function(err, data) {
    if(err) {
      console.log(err);
    } else {
      res.json(data);
    } 
  });
});

// Add comment for article
router.post('/addcomment/:id', function(req, res){
  console.log(req.params.id+' '+req.body.comment);
  Comments.create({
    articleId: req.params.id,
    name: req.body.name,
    comment: req.body.comment
  }, function(err, docs){    
    if(err){
      console.log(err);     
    } else {
      console.log("New Comment Added");
    }
  });
});

// Delete comment for article
router.get('/deletecomment/:id', function(req, res){
  console.log(req.params.id)
  Comments.remove({'_id': req.params.id}).exec(function(err, data){
    if(err){
      console.log(err);
    } else {
      console.log("Comment deleted");
    }
  })
});

module.exports = router;