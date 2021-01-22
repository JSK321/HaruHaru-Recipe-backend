module.exports = function (sequelize, DataTypes){
    var MeasurementUnits = sequelize.define('MeasurementUnits', {
        measurementUnit: DataTypes.STRING,
        UserId: DataTypes.INTEGER
    })

    MeasurementUnits.associate = function(models){
        MeasurementUnits.belongsTo(models.RecipeIngredients)
    }

    return MeasurementUnits
}