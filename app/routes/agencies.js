var agencyController = require('../controllers/agencycontroller.js');
module.exports = function(app){

	app.get('/maintenance/agencies', isLoggedIn, agencyController.list);
	app.get('/maintenance/agencies/manage', isLoggedIn, agencyController.manage);
	app.post('/maintenance/agencies/manage', isLoggedIn, agencyController.managePost);
	app.get('/maintenance/agencies/manage/:id', isLoggedIn, agencyController.manageUpdate);
	app.get('/maintenance/agencies/success', isLoggedIn, agencyController.listSuccess);
	
}

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}