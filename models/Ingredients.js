module.exports = function (sequelize, DataTypes){
    var Ingredients = sequelize.define('Ingredients', {
        ingredientId: DataTypes.INTEGER,
        ingredientName: DataTypes.STRING
    })

    Ingredients.associate = function(models){
        Ingredients.belongsTo(models.RecipeIngredients)
    }

    return Ingredients
}