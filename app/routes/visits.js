var visitController = require('../controllers/visitController.js');
module.exports = function(app){

	app.get('/maintenance/visits', isLoggedIn, visitController.list);
	app.get('/maintenance/visits/manage', isLoggedIn, visitController.manage);
	app.post('/maintenance/visits/manage', isLoggedIn, visitController.managePost);
	app.get('/maintenance/visits/manage/:id', isLoggedIn, visitController.manageUpdate);
	app.get('/maintenance/visits/success', isLoggedIn, visitController.listSuccess);

}

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
