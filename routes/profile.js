var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var User = require('../models/user');

router.get('/profile', userController.isLoggedIn,function(req, res, next) {
    if(req.user.admin != 1){
        res.render('profile', {
        user : req.user
    });
    } else
        res.redirect('/users');
    });

router.post('/profile/edit', function(req, res, next){
    console.log(req.body.username)
});

module.exports = router;