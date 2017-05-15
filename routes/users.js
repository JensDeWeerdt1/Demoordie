var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var User = require('../models/user');

router.get('/users', userController.isLoggedIn,function(req, res, next) {
    res.render('users', {
        user : req.user
    });
    
});

module.exports = router;