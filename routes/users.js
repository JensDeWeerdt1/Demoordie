var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var User = require('../models/user');
var Group = require('../models/group');

router.get('/users', userController.isLoggedIn,function(req, res, users) {
    User.find(function(err, users){
        res.render('users', {
        user : req.user,
        users: users
    })
    
    });
    
});

module.exports = router;