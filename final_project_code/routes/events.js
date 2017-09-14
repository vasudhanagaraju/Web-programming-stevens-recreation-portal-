var express = require('express');
var router = express.Router();
//required by post of login

//set schema
var Event = require('../models/event');
var ChangeEvent = require('../models/event');
var ViewEvent = require('../models/event');
var SignUpEvent = require('../models/signupEvents');
var DeleteEvent = require('../models/event');
var Result = require('../models/result');

//Get the main events
router.get('/mainevents',ensureAuthenticated, function(req, res){
    res.render('mainevents');
});



//Get events page
router.get('/events',ensureAuthenticated, function(req, res){
    res.render('events');
});

//Get events page
router.get('/result',ensureAuthenticated, function(req, res){
    res.render('result');
});

//Post result page
router.post('/result',ensureAuthenticated, function(req, res, next){  
    
    var Match_name = req.body.Match_name;
    var Event_name = req.body.Event_name;
    var Teams = req.body.Teams;
    var result_1 = req.body.Result;
    var Video = req.body.Video;
    var Creator = req.user;

    // var Creator = req.body.Creator;
        //res.render('events');
    //console.log(Match_name);

    req.checkBody('Match_name','Match_name is required').notEmpty();
    req.checkBody('Event_name','Event_name is required').notEmpty();
    req.checkBody('Teams','Teams field is required').notEmpty();
    req.checkBody('Result','Result is required').notEmpty();
    req.checkBody('Video','Video is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        //console.log("There are errors");
        //Rerender the page if there are any errors
        res.render('result',{
            errors:errors
        });
    }else {
    var newresult = new Result({
			Match_name:Match_name,
			Event_name: Event_name,
			Teams: Teams,
            Result: result_1,
            Video: Video,
            Creator: Creator
    });
    console.log(newresult);
    newresult.save(function(err,result){
            req.flash('success_msg','Successfully created');
            res.redirect('/events/result');
            //res.redirect('/');    
        });

    }
});


//Get the modify events page 
/*router.get('/modifyevents',ensureAuthenticated, function(req, res){
    res.render('modifyevents');
});*/

router.get('/modifyevents',ensureAuthenticated, function(req, res){
  ViewEvent.find({user : req.user},function(e,docs){
    res.render('modifyevents', {
      "modifyevents" : docs
    });
  });
});


router.get('/search',ensureAuthenticated, function(req, res){
    Result.find({_id : {$ne:null}},function(e,docs){
    res.render('search', {
      "search" : docs
    });
  });
});

//Search by match name
router.post('/searchmatch',ensureAuthenticated, function(req, res){

var Match_name = req.body.match;

req.checkBody('Match_name','Match_name is required').notEmpty();
console.log(Match_name);
    Result.find({Match_name:req.body.match},function(e,docs){
    res.render('searchmatch', {
      "searchmatch" : docs
    });
  });

});

//Search by event name
router.post('/searchevent',ensureAuthenticated, function(req, res){

var Event_name = req.body.event;

req.checkBody('Event_name','Event_name is required').notEmpty();

    Result.find({Event_name:req.body.event},function(e,docs){
    res.render('searchevent', {
      "searchevent" : docs
    });
  });

});

//Search by team name 
router.post('/searchteam',ensureAuthenticated, function(req, res){

var Teams = req.body.team;

req.checkBody('Teams','Team name is required').notEmpty();
    Result.find({Teams:req.body.team},function(e,docs){
    res.render('searchteam', {
      "searchteam" : docs
    });
  });

});

//get search match
router.get('/searchmatch',ensureAuthenticated, function(req, res){
  Result.find({_id : {$ne:null}},function(e,docs){
    res.render('searchmatch', {
      "searchmatch" : docs
    });
  });
});

//get search event
router.get('/searchevent',ensureAuthenticated, function(req, res){
  Result.find({_id : {$ne:null}},function(e,docs){
    res.render('searchevent', {
      "searchevent" : docs
    });
  });
});

//get search team
router.get('/searchteam',ensureAuthenticated, function(req, res){
  Result.find({_id : {$ne:null}},function(e,docs){
    res.render('searchteam', {
      "searchteam" : docs
    });
  });
});

router.get('/deleteevents',ensureAuthenticated, function(req, res){
  ViewEvent.find({user : req.user},function(e,docs){
    res.render('deleteevents', {
      "deleteevents" : docs
    });
  });
});


//Get Register event 
/*router.get('/signupEvents',ensureAuthenticated, function(req, res){
    res.render('signUpEvents');
});*/

router.get('/signUpEvents',ensureAuthenticated, function(req, res){
  ViewEvent.find({_id : {$ne:null}},function(e,docs){
    res.render('signUpEvents', {
      "signUpEvents" : docs
    });
  });
});

//Post events page
router.post('/events',ensureAuthenticated, function(req, res, next){  
    var Date = req.body.Date;
    var Match_name = req.body.Match_name;
    var Event_name = req.body.Event_name;
    var Team1 = req.body.Team1;
    var Team2 = req.body.Team2;
    var Venue = req.body.Venue;
    var Creator = req.user;

    // var Creator = req.body.Creator;
        //res.render('events');
    //console.log(Match_name);

    req.checkBody('Date','Date is required').notEmpty();
    req.checkBody('Match_name','Match_name is required').notEmpty();
    req.checkBody('Event_name','Event_name is required').notEmpty();
    req.checkBody('Team1','Team1 is required').notEmpty();
    req.checkBody('Team2','Team2 is required').notEmpty();
    req.checkBody('Venue','Venue is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        //console.log("There are errors");
        //Rerender the page if there are any errors
        res.render('events',{
            errors:errors
        });
    }else {
    var newevents = new Event({
            Date: Date,
			Match_name:Match_name,
			Event_name: Event_name,
			Team1: Team1,
            Team2: Team2,
            Venue: Venue,
            user: Creator
    });
    console.log(newevents);
    newevents.save(function(err,result){
            req.flash('success_msg','Successfully created an event');
            res.redirect('/events/events');
            //res.redirect('/');    
        });

    }
});

//Post events signup page
router.post('/signupEvents',ensureAuthenticated, function(req, res, next){
  
    var Creator = req.user;
    var Match_name = req.body.Match_name;
    var Event_name = req.body.Event_name;
    
    req.checkBody('Match_name','Match_name is required').notEmpty();
    req.checkBody('Event_name','Event_name is required').notEmpty();
    var errors = req.validationErrors();

    if(errors){
        res.render('events',{
            errors:errors
        });
    }else {
    var newsignupevents = new SignUpEvent({
            Player : Creator,
			Match_name:Match_name,
			Event_name: Event_name
    });
    console.log(newsignupevents);
    newsignupevents.save(function(err,result){
            req.flash('success_msg','Successfully registered for the event');
            res.redirect('/events/signupEvents');
            //res.redirect('/');    
        });

    }
});


/*//Post update events page
router.post('/updateEvents',ensureAuthenticated, function(req, res, next){
    var Date = req.body.Date;
    var Match_name = req.body.Match_name;
    var Event_name = req.body.Event_name;
    var Team1 = req.body.Team1;
    var Team2 = req.body.Team2;
    var Venue = req.body.Venue;

    req.checkBody('Date','Date is required').notEmpty();
    req.checkBody('Match_name','Match_name is required').notEmpty();
    req.checkBody('Event_name','Event_name is required').notEmpty();
    req.checkBody('Team1','Team1 is required').notEmpty();
    req.checkBody('Team2','Team2 is required').notEmpty();
    req.checkBody('Venue','Venue is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        //console.log("There are errors");
        //Rerender the page if there are any errors
        res.render('modifyevents',{
            errors:errors
        });
    }else{
        var updateevent = new ChangeEvent({
            Date: Date,
			Match_name:Match_name,
			Event_name: Event_name,
			Team1: Team1,
            Team2: Team2,
            Venue: Venue
       });

    var creatorID = req.user.id;
    ChangeEvent.find({'Match_name':Match_name}, function (err, todo) {
        if (err) {
        res.status(500).send(err);
        }else{
            ChangeEvent.update({'Match_name':Match_name}, 
            {
            Date: Date,
			Match_name:Match_name,
			Event_name: Event_name,
			Team1: Team1,
            Team2: Team2,
            Venue: Venue
            },function(req,res,next){
            console.log(res);
            //res.redirect('/');
        });
        }//end inner else
    }); //end changeevent find
//Check with this damn thing 
res.redirect('/');
    } //end else
    

});
*/

//Post update events page
router.post('/updateEvents',ensureAuthenticated, function(req, res, next){
    var Date = req.body.Date;
    var Match_name = req.body.Match_name;
    var Event_name = req.body.Event_name;
    var Team1 = req.body.Team1;
    var Team2 = req.body.Team2;
    var Venue = req.body.Venue;

    req.checkBody('Date','Date is required').notEmpty();
    req.checkBody('Match_name','Match_name is required').notEmpty();
    req.checkBody('Event_name','Event_name is required').notEmpty();
    req.checkBody('Team1','Team1 is required').notEmpty();
    req.checkBody('Team2','Team2 is required').notEmpty();
    req.checkBody('Venue','Venue is required').notEmpty();

    var creatorID = req.user;

    ChangeEvent.update({'Match_name':Match_name}, 
    {
            Date: Date,
			Match_name:Match_name,
			Event_name: Event_name,
			Team1: Team1,
            Team2: Team2,
            Venue: Venue,
            user:creatorID
            },
    function(e,docs){
   // res.render('modifyevents', {
     // "modifyevents" : docs
     res.redirect('/events/modifyevents');
    });
  });

//Post delete event
router.post('/deleteevents',ensureAuthenticated, function(req, res, next){
    
    var Match_name = req.body.Match_name;
    
    req.checkBody('Match_name','Match_name is required').notEmpty();
    var errors = req.validationErrors();

    if(errors){
        res.render('events',{
            errors:errors
        });
    }else {
    var deleteevent = new DeleteEvent({
			Match_name:Match_name
    });
DeleteEvent.findOneAndRemove({'Match_name':Match_name}, function (err, todo) {
        if (err) {
        res.status(500).send(err);
        }else{
           res.redirect('/events/deleteevents');
        }//end inner else
    }); 

    //console.log(deleteevent);

    //deleteevent.remove({'Match_name':Match_name});
    
   // res.redirect('/events/deleteevents');

    }
});





//View Events
router.get('/viewevents',ensureAuthenticated, function(req, res){
  ViewEvent.find({_id : {$ne:null}},function(e,docs){
    res.render('viewevents', {
      "viewevents" : docs
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


router.get('/log');
module.exports = router;