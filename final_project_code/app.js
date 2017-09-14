var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var logger = require('morgan'); 
var favicon = require('serve-favicon');
var MongoStore = require('connect-mongo')(session);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/stevens');

var db = mongoose.connection;

//include routes that needs to be used //Add stuff
var routes = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events');
var slot = require('./routes/slot');

//Initialize the app //G
var app = express();

//set up view engine  //G
app.set('views',path.join(__dirname,'views')); //have a folder called views to handle our views
//the engine is handlebars and the default layout is layout with ext name .handlebars
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
//set view engine to handlebars
app.set('view engine', 'handlebars');

//Body parser and cookie parser middleware //G
app.use(logger('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


//set static folder(to keep stylesheets, images, jquery), stuff that's publicly accesible //G
app.use(express.static(path.join(__dirname, 'public')));

//Middleware for express session //G
app.use(session({
    secret : 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }
}));

//Passport saveUninitialized //G
app.use(passport.initialize());
app.use(passport.session());

//ExpressValidator //G
   app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Conenct flash //G
app.use(flash());

//Global varibales for flash messages //G
app.use(function(req, res, next){
    //res.locals is used when you want to create a global variable
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


//Add middlewares to our route files //Add stuff
app.use('/', routes); // goes to index
app.use('/users', users); //goes to users
app.use('/events', events); //goes to events 
app.use('/slot',slot);// goes to slot

//set passport
app.set('port', (process.env.PORT || 3000));


//Start the server
app.listen(app.get('port'), function(){
    console.log("Started on localhost:3000");
});


 