module.exports = function (sequelize, DataTypes){
    var measurementUnits = sequelize.define('measurementUnits', {
        measurementId: DataTypes.INTEGER,
        measurementUnit: DataTypes.STRING
    })

    measurementUnits.associate = function(models){
        measurementUnits.belongsTo(models.recipeIngredients)
    }

    return measurementUnits
}