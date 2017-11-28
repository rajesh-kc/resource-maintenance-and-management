    var express    = require('express');
    var app        = express();
    var passport   = require('passport');
    var session    = require('express-session');
    var bodyParser = require('body-parser');
    var env        = require('dotenv').load();
    //var exphbs     = require('express-handlebars');
    var ejs         = require('ejs');
    var flash    = require('connect-flash');
    var path        = require('path');
    var morgan      = require('morgan');
    var expressValidator = require('express-validator');


    app.use(morgan('dev')); // log every request to the console
    //For BodyParser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(flash()); // use connect-flash for flash messages stored in session


     // For Passport
    app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(expressValidator());


     app.set('view engine', 'ejs'); // set up ejs for templating
    app.set('views', path.join(__dirname + '/app/views'));
    app.use('/public', express.static(__dirname+'/public'));

    app.get('/', function(req, res) {
        res.render('index', { message: req.flash('loginMessage') }); // load the index.ejs file
    });


	//Models
    var models = require("./app/models");


    //Routes
    var authRoute = require('./app/routes/auth.js')(app,passport);

    //var userRoute = require('./app/routes/user')(app);
    require('./app/routes')(app);

    //load passport strategies
    require('./app/config/passport/passport.js')(passport,models.user);


    //Sync Database
   	models.sequelize.sync().then(function(){
        console.log('Nice! Database looks fine');
    }).catch(function(err){
        console.log(err,"Something went wrong with the Database Update!");
    });



	app.listen(5000, function(err){
		if(!err)
		console.log("Site is live"); else console.log(err)

	});




    