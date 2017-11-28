var exports = module.exports = {}

var models = require("../models");
var Sale = models.Sale;
var Service = models.Service;

exports.list = function(req,res){	
	Sale.findAll({include: [{ model: Service, attributes: ['id', 'service_name'] }] }).then(function (saleModel) {
      	res.render('sales/list', {
			sales_list: saleModel,
			user : req.user
		});

    }).catch(function(err){
    	console.log("Error:",err);
    });
	 
}

exports.manage = function(req,res){
	Service.findAll().then(function(serviceModel){
		res.render('sales/manage', {
			user : req.user,
			post_status: "add",
			services_list: serviceModel
		}); 
	}).catch(function(err){
    	console.log("Error:",err);
    });
	
}

exports.listSuccess = function(req,res){	
	Sale.findAll({include: [{ model: Service, attributes: ['id', 'service_name'] }] }).then(function (saleModel) {
      	res.render('sales/list', {
			sales_list: saleModel,
			user : req.user,
			message: req.flash('message')
		}); 

    }).catch(function(err){
    	console.log("Error:",err);
    });
	
}

exports.managePost = function(req,res){

	
	req.checkBody({
		service_id: {
		    notEmpty: true,
		    errorMessage: 'Required'
		  },
		  duration: {
		    notEmpty: true,
		    errorMessage: 'Required'
		  },
		  amount: {
		    notEmpty: true,
		    errorMessage: 'Required'
		  },
		  order_date: {
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
        	Sale.findOne({where: {id: req.body.id}}).then(function (sale){
        		req.flash('errors', error_msg);
				res.redirect(`/sales/manage/${req.body.id}`);
			});
        	
        } else {
        	Service.findAll().then(function(serviceModel){
				res.render('sales/manage', {
					user : req.user,
					post_status: "add",
					services_list: serviceModel,
					errors: error_msg,
					sales_fields: req.body,
					sale_info: req.body
				}); 
			});
        	
        }
	} else {
		if(req.body.status){
			var status = 'Active';
		} else {
			var status = 'Inactive';
		}
		var data = { 
	    	service_id: req.body.service_id,
	        duration: req.body.duration,
	        amount: req.body.amount,
	        order_date: req.body.order_date
	    };
		if(req.body.id){
			
			Sale.update(data, {where: {id: req.body.id}}).then(function(result){				
				req.flash('message', 'Sale record updated successfully');
				console.log("no errors");
				res.redirect('/sales/success');
			});
		} else {				    
			Sale.create(data).then(function(result){
				//console.log(err);
				req.flash('message', 'Sale record added successfully');
				console.log("no errors");
				res.redirect('/sales/success');
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
	Sale.findOne({where: {id: id}}).then(function (sale){
		if(sale) {
			Service.findAll().then(function(serviceModel){
				res.render('sales/manage', {
					user : req.user,
					sale_info: sale,
					errors: errors_json,
					post_status: "update",
					services_list: serviceModel
				});

			});
			
		} else {
			req.flash('message', 'Sale info not found');
			console.log("Sale info not found");
			res.redirect('/sales');	
		}

	});

}