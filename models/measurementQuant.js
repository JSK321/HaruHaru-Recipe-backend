module.exports = function (sequelize, DataTypes){
    var measurementQuant = sequelize.define('measurementQuant', {
        quantAmount: DataTypes.STRING
    })

    measurementQuant.associate = function(models){
        measurementQuant.belongsTo(models.recipeIngredients)
    }

    return measurementQuant
}