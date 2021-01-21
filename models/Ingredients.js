module.exports = function (sequelize, DataTypes){
    var ingredients = sequelize.define('ingredients', {
        ingredientName: DataTypes.STRING
    })

    ingredients.associate = function(models){
        ingredients.belongsTo(models.recipeIngredients)
    }

    return ingredients
}