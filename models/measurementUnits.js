module.exports = function (sequelize, DataTypes){
    var MeasurementUnits = sequelize.define('MeasurementUnits', {
        measurementId: DataTypes.INTEGER,
        measurementUnit: DataTypes.STRING
    })

    MeasurementUnits.associate = function(models){
        MeasurementUnits.belongsTo(models.RecipeIngredients)
    }

    return MeasurementUnits
}