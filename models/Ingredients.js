module.exports = function (sequelize, DataTypes){
    var Ingredients = sequelize.define('Ingredients', {
        ingredientName: DataTypes.STRING,
        UserId: DataTypes.INTEGER
    })

    Ingredients.associate = function(models){
        Ingredients.belongsTo(models.RecipeIngredients)
    }

    return Ingredients
}