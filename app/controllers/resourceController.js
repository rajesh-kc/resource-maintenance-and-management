var exports = module.exports = {}

var bCrypt = require('bcrypt-nodejs');
var models = require("../models");
var Resource = models.Resource;

exports.list = function(req,res){
	var Agency = models.Agency;
	Resource.findAll({include: [{ model: Agency, attributes: ['agency_name'] }] }).then(function (resourceModel) {
      	res.render('resources/list', {
			resources_list: resourceModel,
			user : req.user
		});

    }).catch(function(err){
    	console.log("Error:",err);
    });
	 
}

exports.manage = function(req,res){
	var Agency = models.Agency;
	Agency.findAll().then(function(agencyModel){
		res.render('resources/manage', {
			user : req.user,
			post_status: "add",
			agencies_list: agencyModel
		}); 
	}).catch(function(err){
    	console.log("Error:",err);
    });
	
}

exports.listSuccess = function(req,res){
	var Agency = models.Agency;
	Resource.findAll({include: [{ model: Agency, attributes: ['agency_name'] }] }).then(function (resourceModel) {
      	res.render('resources/list', {
			resources_list: resourceModel,
			user : req.user,
			message: req.flash('message')
		}); 

    }).catch(function(err){
    	console.log("Error:",err);
    });
	
}

exports.managePost = function(req,res){

	
	req.checkBody({
		equipment_name: {
		    notEmpty: true,
		    errorMessage: 'Required'
		  },
		  manufacturer: {
		    notEmpty: true,
		    errorMessage: 'Required'
		  },
		  category: {
		    notEmpty: true,
		    errorMessage: 'Required'
		  },
		  purchased_date: {
		    notEmpty: true,
		    errorMessage: 'Required'
		  },
		  purchased_price: {
		    notEmpty: true,
		    errorMessage: 'Required'
		  },
		  quantity: {
		    notEmpty: true,
		    errorMessage: 'Required'
		  },
		  agency_id: {
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
        	Resource.findOne({where: {id: req.body.id}}).then(function (resource){
        		req.flash('errors', error_msg);
				res.redirect(`/resources/manage/${req.body.id}`);
			});
        	
        } else {

        	res.render('resources/manage', {
				user : req.user,
				errors: error_msg,
				resources_fields: req.body,
				resource_info: req.body,
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
	    	equipment_name: req.body.equipment_name,
	        manufacturer: req.body.manufacturer,
	        category: req.body.category,
	        purchased_date: req.body.purchased_date,
	        purchased_price: req.body.purchased_price,
	        quantity: req.body.quantity,
	        agency_id: req.body.agency_id,
	        status: status,
	        updatedAt: Date.now()
	    };
		if(req.body.id){
			
			Resource.update(data, {where: {id: req.body.id}}).then(function(result){				
				req.flash('message', 'Resource record updated successfully');
				console.log("no errors");
				res.redirect('/resources/success');
			});
		} else {				    
			Resource.create(data).then(function(result){
				//console.log(err);
				req.flash('message', 'Resource record added successfully');
				console.log("no errors");
				res.redirect('/resources/success');
			});					
			
			
		}
		
	}

	 
}

exports.manageUpdate = function(req,res){
	var Agency = models.Agency;
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
	Resource.findOne({where: {id: id}}).then(function (resource){
		if(resource) {
			Agency.findAll().then(function(agencyModel){
				res.render('resources/manage', {
					user : req.user,
					resource_info: resource,
					errors: errors_json,
					post_status: "update",
					agencies_list: agencyModel
				});

			});
			
		} else {
			req.flash('message', 'Resource not found');
			console.log("Resource not found");
			res.redirect('/resources')	
		}

	});

}

