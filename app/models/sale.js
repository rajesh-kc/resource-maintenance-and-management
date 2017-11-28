"use strict";
module.exports = function(sequelize, Sequelize) {

	var Sale = sequelize.define('Sale', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		service_id: { type: Sequelize.INTEGER, notEmpty: true},
		duration: { type: Sequelize.INTEGER, notEmpty: true},
		amount: { type: Sequelize.FLOAT, notEmpty: true},
		order_date: {type: Sequelize.DATE}

	}, {
		tableName: 'sales',
	    timestamps: false,
	    freezeTableName: true
	});

	Sale.associate = function(models) {
	    Sale.belongsTo(models.Service, {
	      onDelete: "CASCADE",
	      foreignKey: "service_id"
	    });
	  }


	return Sale;

}