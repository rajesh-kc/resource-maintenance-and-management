module.exports = function(sequelize, Sequelize) {

	var Resource = sequelize.define('Resource', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		equipment_name: { type: Sequelize.STRING,notEmpty: true},
		manufacturer: { type: Sequelize.STRING,notEmpty: true},
		category: { type: Sequelize.STRING,notEmpty: true},
		purchased_date: {type: Sequelize.DATE},
		purchased_price: {type:Sequelize.FLOAT},
		quantity : {type:Sequelize.INTEGER},
		purchased_date: {type: Sequelize.DATE},
	    agency_id: { type: Sequelize.INTEGER, notEmpty: true},
	    status: {type: Sequelize.ENUM('Active','Inactive'),defaultValue:'Active' }

	}, {
		tableName: 'resources',
	    underscored: true,
	    timestamps: false,
	    paranoid: true,
	    freezeTableName: true
	});

	Resource.associate = function(models) {
	    Resource.belongsTo(models.Agency, {
	      onDelete: "CASCADE",
	      foreignKey: "agency_id"
	    });
	    Resource.hasMany(models.Visit, { foreignKey: 'resource_id'});
	  }


	return Resource;

}
