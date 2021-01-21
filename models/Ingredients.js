module.exports = function (sequelize, DataTypes){
    var Ingredients = sequelize.define('Ingredients', {
        ingredientName: DataTypes.STRING,
        quantity: DataTypes.INTEGER
    })

    Ingredients.associate = function(models){
        Ingredients.belongsTo(models.Recipes)
    }

    return Ingredients
}