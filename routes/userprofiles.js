var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var User = require('../models/user');


router.get('/:i', userController.isLoggedIn,function(req, res, next) {
        User.find(function(err, users){
        res.render('useradmin', {
        user : req.user,
        users: users,
        g: req.params.i
        })
    
    });
        
});

module.exports = router;