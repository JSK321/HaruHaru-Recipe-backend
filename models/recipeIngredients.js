module.exports = function (sequelize, DataTypes){
    var RecipeIngredients = sequelize.define('RecipeIngredients', {
        ingredientId: DataTypes.INTEGER,
        measurementUnitId: DataTypes.INTEGER,
        measurementQuantId: DataTypes.INTEGER,
        UserId: DataTypes.INTEGER
    })

    RecipeIngredients.associate = function(models){
        RecipeIngredients.belongsTo(models.Recipes)
        RecipeIngredients.hasMany(models.MeasurementQuant)
        RecipeIngredients.hasMany(models.MeasurementUnits)
        RecipeIngredients.hasMany(models.Ingredients)
        RecipeIngredients.hasMany(models.Steps)
    }

    return RecipeIngredients
}