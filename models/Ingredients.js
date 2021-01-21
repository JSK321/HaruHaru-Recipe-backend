module.exports = function (sequelize, DataTypes){
    var Ingredients = sequelize.define('ingredients', {
        ingredientId: DataTypes.INTEGER,
        ingredientName: DataTypes.STRING
    })

    Ingredients.associate = function(models){
        Ingredients.belongsTo(models.recipeIngredients)
    }

    return Ingredients
}