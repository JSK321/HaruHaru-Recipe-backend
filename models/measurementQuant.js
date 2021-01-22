module.exports = function (sequelize, DataTypes){
    var MeasurementQuant = sequelize.define('MeasurementQuant', {
        quantAmount: DataTypes.STRING,
        UserId: DataTypes.INTEGER
    })

    MeasurementQuant.associate = function(models){
        MeasurementQuant.belongsTo(models.RecipeIngredients)
    }

    return MeasurementQuant
}