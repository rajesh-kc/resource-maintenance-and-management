
module.exports = function(sequelize, Sequelize) {

	var Visit = sequelize.define('Visit', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		agency_id: { type: Sequelize.INTEGER, notEmpty: true},
		resource_id: { type:Sequelize.INTEGER, notEmpty: true},
		visit_date: {type: Sequelize.DATE, notEmpty: true},
		feedback : {type:Sequelize.TEXT}

	}, {
		tableName: 'maintenance_visits',
	    timestamps: false,
	    paranoid: true,
	    freezeTableName: true
	});

	
	Visit.associate = function(models) {
	    Visit.belongsTo(models.Agency, {
	      onDelete: "CASCADE",
	      foreignKey: "agency_id"
	    });
	    Visit.belongsTo(models.Resource, {
	      onDelete: "CASCADE",
	      foreignKey: "resource_id"
	    });
		
	}


	return Visit;

}
