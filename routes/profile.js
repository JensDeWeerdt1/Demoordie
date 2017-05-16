var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var User = require('../models/user');
var Group = require('../models/group');

router.get('/profile', userController.isLoggedIn,function(req, res, next) {
    if(req.user.admin != 1){
        Group.find(function(err, groups){
                res.render('profile', {
                user : req.user,
                groups: groups
                
                });  
            })
        
    } else
        res.redirect('/users');
    });

router.post('/profile/edit', function(req, res, next){
    console.log(req.body.username)
});

module.exports = router;