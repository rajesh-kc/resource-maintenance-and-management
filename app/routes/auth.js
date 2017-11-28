var authController = require('../controllers/authcontroller.js');

module.exports = function(app,passport){

app.get('/signup', authController.signup);

app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/dashboard',
                                                    failureRedirect: '/signup'}
                                                    ));

app.get('/dashboard',isLoggedIn, authController.dashboard);

app.get('/logout',authController.logout);

app.post('/login', passport.authenticate('local-signin',  { successRedirect: '/dashboard',
                                                    failureRedirect: '/'}
                                                    ));
//app.get('/users', isLoggedIn, authController.users);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}


}






