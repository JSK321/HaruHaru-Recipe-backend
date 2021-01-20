module.exports = function(sequelize, DataTypes){
    var Steps = sequelize.define('Steps', { 
        directions: DataTypes.TEXT
    })

    Steps.associate = function(models) {
        Steps.belongsTo(models.Ingredients)
        Steps.belongsTo(models.Recipes)
    }

    return Steps
}