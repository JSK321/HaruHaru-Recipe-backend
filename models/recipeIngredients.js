module.exports = function (sequelize, DataTypes){
    var recipeIngredients = sequelize.define('recipeIngredients', {
        ingredientId: DataTypes.INTEGER,
        measurementUnitId: DataTypes.INTEGER,
        measurementQuant: DataTypes.INTEGER
    })

    recipeIngredients.associate = function(models){
        recipeIngredients.belongsTo(models.Recipes)
        recipeIngredients.hasMany(models.measurementQuant)
        recipeIngredients.hasMany(models.measurementUnits)
        recipeIngredients.hasMany(models.ingredients)
    }

    return recipeIngredients
}