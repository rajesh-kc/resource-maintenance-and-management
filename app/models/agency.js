"use strict";
//var Resource = require('./resource');
module.exports = function(sequelize, Sequelize) {

	var Agency = sequelize.define('Agency', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		agency_name: { type: Sequelize.STRING,notEmpty: true},
		person_name: { type: Sequelize.STRING,notEmpty: true},
		email: { type:Sequelize.STRING, validate: {isEmail:true} },
		phone: {type:Sequelize.INTEGER},
		address : {type:Sequelize.TEXT},
		status: {type: Sequelize.ENUM('active','inactive'),defaultValue:'active' }

	}, {
		tableName: 'maintenance_agencies',
	    timestamps: false,
	    paranoid: true,
	    freezeTableName: true
	});

	Agency.associate = function(models) {
	    Agency.hasMany(models.Resource, { foreignKey: 'agency_id'});

	    Agency.hasMany(models.Visit, { foreignKey: 'agency_id'});
	    //Agency.hasMany(models.Visit, {foreignkey: 'agency_id'});
	    //console.log(models);
	}
	return Agency;

}
