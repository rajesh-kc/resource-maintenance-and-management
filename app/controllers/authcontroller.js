var exports = module.exports = {}
var models = require("../models");
var User = models.user;
var Resource = models.Resource;
var Agency = models.Agency;
var Visit = models.Visit;
var Resource = models.Resource;
var Service = models.Service;
var Sale = models.Sale;

exports.signup = function(req,res){
	res.render('signup'); 
}

exports.dashboard = function(req,res){
	User.count().then(function(userCount){
		Resource.count().then(function(resourceCount){
			Agency.count().then(function(agencyCount){
				Visit.count().then(function(visitCount){
					Service.count().then(function(serviceCount){
						Sale.count().then(function(saleCount){							
							res.render('dashboard', {
								user : req.user, // get the user out of session and pass to template
								user_count: userCount,
								agency_count: agencyCount,
								visit_count: visitCount,
								resource_count: resourceCount,
								service_count: serviceCount,
								sale_count: saleCount

							});
						});
					});
				});
			});
		});
	});
	
}

exports.logout = function(req,res){
  req.session.destroy(function(err) {
  res.redirect('/');
  });
}

/*exports.users = function(req,res){
	res.render('users/list', {
		res.render('users/list', {
			users_list: user_controller.list,
			user : req.user
		});
	}); 
}*/