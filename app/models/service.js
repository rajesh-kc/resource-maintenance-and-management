
module.exports = function(sequelize, Sequelize) {

	var Service = sequelize.define('Service', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		service_name: { type: Sequelize.STRING, notEmpty: true},
		duration: { type: Sequelize.INTEGER, notEmpty: true},
		price: { type: Sequelize.FLOAT, notEmpty: true},
		description: {type: Sequelize.TEXT},
		status: {type: Sequelize.ENUM('active','inactive'),defaultValue:'active' }

	}, {
		tableName: 'services',
	    timestamps: false,
	    freezeTableName: true
	});

	Service.associate = function(models) {
	    Service.hasMany(models.Sale, { foreignKey: 'service_id'});
	}

	return Service;

}