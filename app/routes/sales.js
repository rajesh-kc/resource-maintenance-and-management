var saleController = require('../controllers/salecontroller.js');
module.exports = function(app){

	app.get('/sales', isLoggedIn, saleController.list);
	app.get('/sales/manage', isLoggedIn, saleController.manage);
	app.post('/sales/manage', isLoggedIn, saleController.managePost);
	app.get('/sales/manage/:id', isLoggedIn, saleController.manageUpdate);
	app.get('/sales/success', isLoggedIn, saleController.listSuccess);
	
}

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}