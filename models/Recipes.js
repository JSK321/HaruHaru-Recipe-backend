module.exports = function (sequelize, DataTypes) {
    var Recipes = sequelize.define('Recipes', {
        recipeName: DataTypes.STRING,
        recipeImage: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })

    Recipes.associate = function(models){
        Recipes.hasMany(models.recipeIngredients)
        // Recipes.hasMany(models.Steps)
    }

    return Recipes
}