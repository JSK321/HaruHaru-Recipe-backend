module.exports = function (sequelize, DataTypes){
    var Ingredients = sequelize.define('Ingredients', {
        ingredient: DataTypes.STRING,
        ingredientQuant: DataTypes.DECIMAL(10,2),
        ingredientUnit: DataTypes.STRING,
        RecipeId: DataTypes.INTEGER
    })

    Ingredients.associate = function(models){
        Ingredients.belongsTo(models.Recipes)
        Ingredients.belongsTo(models.Users)
    }

    return Ingredients
}