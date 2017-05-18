var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var User = require('../models/user');
var Group = require('../models/group');

router.get('/:userselect/demo', userController.isLoggedIn,function(req, res, users) {
    Group.find(function(err, groups){
        User.find(function(err, users){
        res.render('demo', {
        user : req.user,
        users: users,
        groups: groups
        })
    
    });
    })
    
    
});

module.exports = router;