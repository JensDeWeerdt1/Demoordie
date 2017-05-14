var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport   = require('passport');
var path = require('path');
var cookieParser = require('cookie-parser');

var app = express();

mongoose.connect('mongodb://localhost/demoordie');
// pass passport for configuration
require('./config/passport')(passport);

// view engine setup, waar zitten views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'demoordie' }));


app.use('/', require('./routes/index'));
app.use('/', require('./routes/profile'));

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.json(res);
  });

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})




