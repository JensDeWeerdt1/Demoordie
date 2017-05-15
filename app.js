var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport   = require('passport');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

mongoose.connect('mongodb://localhost/demoordie');
// pass passport for configuration
require('./config/passport')(passport);

// view engine setup, waar zitten views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'demoordie' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', require('./routes/index'));
app.use('/', require('./routes/profile'));
app.use('/', require('./routes/logout'));
app.use('/', require('./routes/users'));

app.get('/login/facebook',
    passport.authenticate('facebook', { scope : 'email' }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})




