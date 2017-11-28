var exports = module.exports = {}

var bCrypt = require('bcrypt-nodejs');
var models = require("../models");
var Service = models.Service;

exports.list = function(req,res){

	Service.findAll().then(function (serviceModel) {
      	res.render('services/list', {
			services_list: serviceModel,
			user : req.user
		});

    }).catch(function(err){
    	console.log("Error:",err);
    });
	 
}

exports.manage = function(req,res){

	res.render('services/manage', {
		user : req.user,
		post_status: "add"
	}); 

	
}

exports.listSuccess = function(req,res){

	Service.findAll().then(function (serviceModel) {
      	res.render('services/list', {
			services_list: serviceModel,
			user : req.user,
			message: req.flash('message')
		}); 

    }).catch(function(err){
    	console.log("Error:",err);
    });
	
}

exports.managePost = function(req,res){

	
	req.checkBody({
		service_name: {
		    notEmpty: true,
		    errorMessage: 'Required'
		  },
		  duration: {
		    notEmpty: true,
		    errorMessage: 'Required'
		  },
		  price: {
		    notEmpty: true,
		    errorMessage: 'Required'
		  }
	});

	
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
        	Service.findOne({where: {id: req.body.id}}).then(function (resource){
        		req.flash('errors', error_msg);
				res.redirect(`/services/manage/${req.body.id}`);
			});
        	
        } else {

        	res.render('services/manage', {
				user : req.user,
				errors: error_msg,
				services_fields: req.body,
				service_info: req.body,
				post_status: "add"
			});
        }
	} else {
		if(req.body.status){
			var status = 'Active';
		} else {
			var status = 'Inactive';
		}
		var data = { 
	    	service_name: req.body.service_name,
	        duration: req.body.duration,
	        price: req.body.price,
	        description: req.body.description,
	        status: status
	    };
		if(req.body.id){
			
			Service.update(data, {where: {id: req.body.id}}).then(function(result){				
				req.flash('message', 'Service record updated successfully');
				console.log("no errors");
				res.redirect('/services/success');
			});
		} else {				    
			Service.create(data).then(function(result){
				//console.log(err);
				req.flash('message', 'Service record added successfully');
				console.log("no errors");
				res.redirect('/services/success');
			});					
			
			
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
	Service.findOne({where: {id: id}}).then(function (service){
		if(service) {

			res.render('services/manage', {
				user : req.user,
				service_info: service,
				errors: errors_json,
				post_status: "update"
			});

			
		} else {
			req.flash('message', 'Service not found');
			console.log("Service not found");
			res.redirect('/services')	
		}

	});

}

