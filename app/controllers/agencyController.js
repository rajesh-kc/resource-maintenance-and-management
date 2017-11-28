var exports = module.exports = {}

var bCrypt = require('bcrypt-nodejs');
var models = require("../models");
var Agency = models.Agency;

exports.list = function(req,res){
	Agency.findAll().then(function (agencyModel) {
      	res.render('agencies/list', {
			agencies_list: agencyModel,
			user : req.user
		});

    }).catch(function(err){
    	console.log("Error:",err);
    });
	 
}

exports.manage = function(req,res){
	res.render('agencies/manage', {
		user : req.user,
		post_status: "add"
	}); 
}

exports.listSuccess = function(req,res){
	Agency.findAll().then(function (agencyModel) {
      	res.render('agencies/list', {
			agencies_list: agencyModel,
			user : req.user,
			message: req.flash('message')
		}); 

    }).catch(function(err){
    	console.log("Error:",err);
    });
	
}

exports.managePost = function(req,res){

	
	req.checkBody({
		agency_name: {
		    notEmpty: true,
		    errorMessage: 'Required'
		  },
		  person_name: {
		    notEmpty: true,
		    errorMessage: 'Required'
		  },
		  email: {
		    notEmpty: true,
		    isEmail: true,
		    errorMessage: 'Invalid email address'
		  },
		  phone: {
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
        	Agency.findOne({where: {id: req.body.id}}).then(function (agency){
        		req.flash('errors', error_msg);
				res.redirect(`/maintenance/agencies/manage/${req.body.id}`);
			});
        	
        } else {

        	res.render('agencies/manage', {
				user : req.user,
				errors: error_msg,
				agencies_fields: req.body,
				agency_info: req.body,
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
	    	agency_name: req.body.agency_name,
	        person_name: req.body.person_name,
	        email: req.body.email,
	        phone: req.body.phone,
	        address: req.body.address,	        
	        status: status,
	        updatedAt: Date.now()
	    };
	    console.log(data);
		if(req.body.id){
			
			Agency.update(data, {where: {id: req.body.id}}).then(function(result){				
				req.flash('message', 'Agency record updated successfully');
				console.log("no update errors");
				res.redirect('/maintenance/agencies/success');
			});
		} else {				    
			Agency.create(data).error(function(err){
				console.log(err);
			});					
			
			req.flash('message', 'Agency record added successfully');
			console.log("no errors");
			res.redirect('/maintenance/agencies/success');
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
	Agency.findOne({where: {id: id}}).then(function (agency){
		if(agency) {
			res.render('agencies/manage', {
				user : req.user,
				agency_info: agency,
				errors: errors_json,
				post_status: "update"
			});
		} else {
			req.flash('message', 'Agency not found');
			console.log("Agency not found");
			res.redirect('/maintenance/agencies')	
		}

	});

}

