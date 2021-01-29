module.exports = function (sequelize, DataTypes) {
    var SavedRecipes = sequelize.define('SavedRecipes', {
        recipeName: DataTypes.STRING,
        recipeDescript: DataTypes.TEXT,
        recipeImage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        recipeId: DataTypes.INTEGER
    })

    SavedRecipes.associate= function (models){
        SavedRecipes.hasMany(models.Ingredients)
        SavedRecipes.hasMany(models.Steps)
        SavedRecipes.belongsTo(models.Users)
    }


    return SavedRecipes
}