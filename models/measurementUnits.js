module.exports = function (sequelize, DataTypes){
    var measurementUnits = sequelize.define('measurementUnits', {
        measurementUnit: DataTypes.STRING
    })

    measurementUnits.associate = function(models){
        measurementUnits.belongsTo(models.recipeIngredients)
    }

    return measurementUnits
}