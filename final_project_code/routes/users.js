var express = require('express');
var router = express.Router();
//required by post of login
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Set schema
var User = require('../models/user');

//Get register page
router.get('/register', function(req, res){
    res.render('register');
});


//get login page
router.get('/login', function(req, res){
    res.render('login');
});

//Post register page
router.post('/register', function(req, res){
    //Get all the variables that are being submitted and store in a varible
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    //res.render('register');
    //console.log(name);

    //Validation
    req.checkBody('name','Name is required').notEmpty();
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('password','Password is required').notEmpty();
    req.checkBody('password2','Password is required').notEmpty();
    req.checkBody('password2','Name is required').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
        //console.log("There are errors");
        //Rerender the page if there are any errors
        res.render('register',{
            errors:errors
        });
    } else {
        //Create the models schema before you touch this block
        //console.log("There are no errors");
        var newUser = new User({
			name: name,
			username: username,
			password: password
		});

        User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});
        //for the msg to show you, you will have to add a placeholder in th layout.hbs just above the body
        req.flash('success_msg', 'You are registered and can now login');
        res.redirect('/users/login');
}

});

//passport configuration - pre
//gets the username with a match and validates the password
//Check with the printing of errors
passport.use(new LocalStrategy(
  function(username, password, done) {
User.getUserByUsername(username, function(err, user){
if(err) throw err;
if(!user){
    return done(null, false, {message: 'Unknown User'});
}
User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));


//serializeUser and deserializeUser
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

//post login
router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

//logout
  router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});


router.get('/log')
module.exports = router;