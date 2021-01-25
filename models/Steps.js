module.exports = function(sequelize, DataTypes){
    var Steps = sequelize.define('Steps', { 
        directions: DataTypes.TEXT,
        RecipeId: DataTypes.INTEGER,
        UserId: DataTypes.INTEGER
    })

    Steps.associate = function(models) {
        Steps.belongsTo(models.Recipes)
        Steps.belongsTo(models.Users)
    }

    return Steps
}