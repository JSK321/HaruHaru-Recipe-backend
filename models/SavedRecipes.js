module.exports = function (sequelize, DataTypes) {
    var SavedRecipes = sequelize.define('SavedRecipes', {
        recipeName: DataTypes.STRING,
        ownerId: DataTypes.INTEGER,
        savedByUser: DataTypes.STRING,
        recipeId: DataTypes.INTEGER
    })

    SavedRecipes.associate= function (models){
        SavedRecipes.belongsTo(models.Users)
    }


    return SavedRecipes
}