var resourceController = require('../controllers/resourcecontroller.js');
module.exports = function(app){

	app.get('/resources', isLoggedIn, resourceController.list);
	app.get('/resources/manage', isLoggedIn, resourceController.manage);
	app.post('/resources/manage', isLoggedIn, resourceController.managePost);
	app.get('/resources/manage/:id', isLoggedIn, resourceController.manageUpdate);
	app.get('/resources/success', isLoggedIn, resourceController.listSuccess);
	
}

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}