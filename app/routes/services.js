var serviceController = require('../controllers/serviceController.js');
module.exports = function(app){

	app.get('/services', isLoggedIn, serviceController.list);
	app.get('/services/manage', isLoggedIn, serviceController.manage);
	app.post('/services/manage', isLoggedIn, serviceController.managePost);
	app.get('/services/manage/:id', isLoggedIn, serviceController.manageUpdate);
	app.get('/services/success', isLoggedIn, serviceController.listSuccess);
	
}

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}