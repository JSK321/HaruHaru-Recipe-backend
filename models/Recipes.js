module.exports = function (sequelize, DataTypes) {
    var Recipes = sequelize.define('Recipes', {
        recipeName: DataTypes.STRING(30),
        recipeDescript: DataTypes.TEXT,
        recipeCategory: DataTypes.STRING,
        recipeImage: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })

    Recipes.associate = function(models){
        Recipes.hasMany(models.Ingredients)
        Recipes.hasMany(models.Steps)
        Recipes.belongsTo(models.Users)
    }

    return Recipes
}