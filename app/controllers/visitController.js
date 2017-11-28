var exports = module.exports = {}

var bCrypt = require('bcrypt-nodejs');
var models = require("../models");
var Visit = models.Visit;
var Resource = models.Resource;
var Agency = models.Agency;

exports.list = function(req,res){
	Visit.findAll({include: [{ model: Agency, attributes: ['agency_name'] }, { model: Resource, attributes: ['equipment_name'] }] }).then(function (visitModel) {
		// Resource.findAll().then(function (resourceModel) {
		//
		// });
		console.log(visitModel);
      	res.render('visits/list', {
				visits_list: visitModel,
				user : req.user
			});

    }).catch(function(err){
    	console.log("Error:",err);
    });

}

exports.manage = function(req,res){

	Agency.findAll({include: [{ model: Resource, attributes: ['id', 'equipment_name'] }] }).then(function(agencyModel){
		Resource.findAll().then(function(resourceModel){
			res.render('visits/manage', {
				user : req.user,
				post_status: "add",
				agencies_list: agencyModel,
				resources_list:resourceModel
			});

		});
	}).catch(function(err){
    	console.log("Error:",err);
	});

}

exports.listSuccess = function(req,res){

	Visit.findAll({include: [{ model: Agency, attributes: ['agency_name'] }, { model: Resource, attributes: ['equipment_name'] }] }).then(function (visitModel) {
				console.log(visitModel);
				res.render('visits/list', {
			visits_list: visitModel,
			user : req.user,
			message: req.flash('message')
		});

    }).catch(function(err){
    	console.log("Error:",err);
    });

}

exports.managePost = function(req,res){


	req.checkBody({
		agency_id: {
		    notEmpty: true,
		    errorMessage: 'Required'
		  },
		  resource_id: {
		    notEmpty: true,
		    errorMessage: 'Required'
		  },
		  visit_date: {
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
        	Visit.findOne({where: {id: req.body.id}}).then(function (visit){
        		req.flash('errors', error_msg);
				res.redirect(`/maintenance/visits/manage/${req.body.id}`);
			});

        } else {

			//console.log("errors are ")
			Agency.findAll({include: [{ model: Resource, attributes: ['id', 'equipment_name'] }] }).then(function(agencyModel){
				Resource.findAll().then(function(resourceModel){
					res.render('visits/manage', {
						user : req.user,
						post_status: "add",
						agencies_list: agencyModel,
						resources_list:resourceModel,
						agencies_list: agencyModel,
						errors: error_msg,
						visit_info: req.body,
						visits_fields: req.body
					});							

				})

        	})
		}
	} else {
		if(req.body.status){
			var status = 'Active';
		} else {
			var status = 'Inactive';
		}
		var data = {
	    	agency_id: req.body.agency_id,
	        resource_id: req.body.resource_id,
	        visit_date: req.body.visit_date,
	        feedback: req.body.feedback
	    };
		if(req.body.id){

			Visit.update(data, {where: {id: req.body.id}}).then(function(result){
				req.flash('message', 'Visit details updated successfully');
				console.log("no errors");
				res.redirect('/maintenance/visits/success');
			});
		} else {
			Visit.create(data).then(function(result){
				//console.log(err);
				req.flash('message', 'Visit details added successfully');
				console.log("no errors");
				res.redirect('/maintenance/visits/success');
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
	Visit.findOne({where: {id: id}}).then(function (visit){
		if(visit) {
			Agency.findAll().then(function(agencyModel){
				Resource.findAll().then(function(resourceModel){
					res.render('visits/manage', {
						user : req.user,
						visit_info: visit,
						errors: errors_json,
						post_status: "update",
						agencies_list: agencyModel,
						resources_list:resourceModel,
					});
				});

			});

		} else {
			req.flash('message', 'Visit info not found');
			console.log("Visit info not found");
			res.redirect('/maintenance/visits')
		}

	});

}
