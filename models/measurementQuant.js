module.exports = function (sequelize, DataTypes){
    var MeasurementQuant = sequelize.define('MeasurementQuant', {
        quantId: DataTypes.INTEGER,
        quantAmount: DataTypes.STRING
    })

    MeasurementQuant.associate = function(models){
        MeasurementQuant.belongsTo(models.RecipeIngredients)
    }

    return MeasurementQuant
}