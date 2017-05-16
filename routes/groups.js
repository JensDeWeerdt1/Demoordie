var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var Group = require('../models/group');


router.get('/group', userController.isLoggedIn, function(req, res){
    res.render('addgroup');
});

router.post('/group/edit', function (req,res) {
   var addGroup = req.body.group;
    Group.findOne({
        'groupname': addGroup
    }, function(err, group) {
        if (err) {
            console.log(err);
            return err;
        }
        if (group) {
            console.log(group);
            return group;
        } else {
            var newGroup = new Group();
            newGroup.groupname = addGroup;
            console.log(newGroup);
            newGroup.save(function(err) {
                if (err) {
                    throw err;
                }
                else {
                    return newGroup;
                }
            })
        }
    });
    res.redirect('/profile');
});
    
module.exports = router;

