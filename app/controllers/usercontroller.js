var exports = module.exports = {}

var bCrypt = require('bcrypt-nodejs');
var models = require("../models");
var User = models.user;


exports.list = function(req,res){
	User.findAll().then(function (userModel) {
      	res.render('users/list', {
			users_list: userModel,
			user : req.user
		});

    }).catch(function(err){
    	console.log("Error:",err);
    });
	 
}


exports.list = function(req,res){
	User.findAll().then(function (userModel) {
      	res.render('users/list', {
			users_list: userModel,
			user : req.user
		});

    }).catch(function(err){
    	console.log("Error:",err);
    });
	 
}

exports.listSuccess = function(req,res){
	User.findAll().then(function (userModel) {
      	res.render('users/list', {
			users_list: userModel,
			user : req.user,
			message: req.flash('message')
		}); 

    }).catch(function(err){
    	console.log("Error:",err);
    });
	
}

exports.manage = function(req,res){
	res.render('users/manage', {
		user : req.user,
		post_status: "add"
	}); 
}

exports.managePost = function(req,res){

	if(req.body.id){
		req.checkBody({
			name: {
			    notEmpty: true,
			    errorMessage: 'Required'
			  },
			  email: {
			    notEmpty: true,
			    isEmail: true,
			    errorMessage: 'Invalid email address'
			  }
		});
	} else {
		req.checkBody({
			name: {
			    notEmpty: true,
			    errorMessage: 'Required'
			  },
			  email: {
			    notEmpty: true,
			    isEmail: true,
			    errorMessage: 'Invalid email address'
			  },
			  password: {
			    notEmpty: true,
			    errorMessage: 'Required'
			  }
		});
	}
	
	String.prototype.capitalize = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	}
	var errors = req.validationErrors();

	if(errors){		
		var error_msg = {};
        errors.forEach(function(error){
        	var param = error.param.capitalize();
            error_msg[error.param] = param +': '+error.msg;
        });
        if(req.body.id){
        	User.findOne({where: {id: req.body.id}}).then(function (user){
        		req.flash('errors', error_msg);
				res.redirect(`/users/manage/${req.body.id}`);
			});
        	
        } else {

        	res.render('users/manage', {
				user : req.user,
				errors: error_msg,
				user_fields: req.body,
				user_info: req.body,
				post_status: "add"
			});
        }
	} else {

		if(req.body.id){
			if(req.body.status){
				var status = 'Active';
			} else {
				var status = 'Inactive';
			}
			var data = { 
		    	email: req.body.email,
		        name: req.body.name,
		        phone: req.body.phone,
		        address: req.body.address,
		        role: req.body.role,
		        status: status,
		        updatedAt: Date.now()
		    };
		    
			User.update(data, {where: {id: req.body.id}}).then(function(result){				
				req.flash('message', 'User record updated successfully');
				console.log("no errors");
				res.redirect('/users/success');
			});
		} else {
			User.findOne({where: {email: req.body.email}}).then(function (user){
				if(!user) {
					var generateHash = function(password) {
				    	return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
				    };
				    var userPassword = generateHash(req.body.password);
				    var data = { 
				    	email: req.body.email,
				        password: userPassword,
				        name: req.body.name,
				        phone: req.body.phone,
				        address: req.body.address,
				        role: "Staff",
				        status: "Active",
				        createdAt: Date.now()
				    };
					User.create(data).error(function(err){
						console.log(err);
					});
					
				} else {
					console.log("user found");
					//res.redirect('/signup')
				}
			});
			req.flash('message', 'User record added successfully');
			console.log("no errors");
			res.redirect('/users/success');
		}
		
	}

	 
}

exports.manageUpdate = function(req,res){
	var errors = req.flash('errors');
	var errors_json = {}
	if(errors){
		errors.forEach(function(error){   
			var i=0;
			for(key in error){
				errors_json[i] = error[key];
				i++;
			}
			      	            
        });
	}
	var id = req.params.id;
	User.findOne({where: {id: id}}).then(function (user){
		if(user) {
			res.render('users/manage', {
				user : req.user,
				user_info: user,
				errors: errors_json,
				post_status: "update"
			});
		} else {
			req.flash('message', 'User record not found');
			console.log("user not found");
			res.redirect('/users')	
		}

	});

}


exports.logout = function(req,res){
	req.session.destroy()
	req.logout()
	res.redirect('/')
	
}

