var express = require('express');
var router = express.Router();
const xss = require('xss');

var Slot = require('../models/slot');
var ViewSlot = require('../models/slot');
//to display out the slot page
router.get('/slot', ensureAuthenticated,function(req, res){
	res.render('slot', {message: req.flash('success')});
});


// it used to get the value entered
router.post('/slot', ensureAuthenticated,function(req, res){
	
var name = req.body.name;
var date = req.body.date;
var time = req.body.time;
var Creator = req.user;

req.checkBody('name','Name is Required').notEmpty();
req.checkBody("date",'Date is required').notEmpty();
req.checkBody('time','Time is required').notEmpty();
  
  
  var errors = req.validationErrors();

  if(errors){
	  res.render('slot',{
		  errors:errors
	  });
  }else{
	  var slot_save = new Slot();
 slot_save.name = name;
slot_save.date = date;
slot_save.time = time;
slot_save.user = Creator

slot_save.save(function(error){
   if(error) return next(error);
	 return res.redirect('/');    
	 
  });
  //will dispaly this mess after the booking id done
req.flash('success_msg', 'Successfully booked a slot');

  }
});

//View Events
router.get('/viewslots',ensureAuthenticated, function(req, res){
  ViewSlot.find({_id : {$ne:null}},function(e,docs){
    res.render('viewslots', {
      "viewslots" : docs
    });
  });
});

//To check if user is still logged in
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}


module.exports = router;