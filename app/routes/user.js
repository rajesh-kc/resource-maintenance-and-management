var userController = require('../controllers/usercontroller.js');
module.exports = function(app){

	/*app.use(function (req, res, next) {
		
		console.log(req);
		console.log("aaad");
		console.log(req.headers.referer);
	  // Assign the config to the req object
	  //req.config = config;

	  // Call the next function in the pipeline (your controller actions).
	  return next();

	});*/

	app.get('/users', isLoggedIn, userController.list);
	app.get('/users/manage', isLoggedIn, userController.manage);
	app.post('/users/manage', isLoggedIn, userController.managePost);
	app.get('/users/manage/:id', isLoggedIn, userController.manageUpdate);
	app.get('/users/success', isLoggedIn, userController.listSuccess);

	app.get('/logout', isLoggedIn, userController.logout);
	
}

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}