var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var User = require('../models/user');
var Group = require('../models/group');

router.get('/:i', userController.isLoggedIn,function(req, res, next) {
    Group.find(function(err, groups){    
        User.find(function(err, users){
        res.render('useradmin', {
        user : req.user,
        users: users,
        groups: groups,
        selecteduser: req.params.i
        })
    
    });
    })
        
});

module.exports = router;