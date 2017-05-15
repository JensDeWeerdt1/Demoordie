function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        return next();
    } else {
        console.log('test');
        res.redirect('/');
    }
        
    
}

module.exports.isLoggedIn = isLoggedIn;