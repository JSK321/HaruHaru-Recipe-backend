// const bcrypt = require('bcrypt')

module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define('User', {
        name: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            required: true,
            validate: {
                len: [8]
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        // profileImage: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // }
    });

    Users.associate = function (models) {
        Users.hasMany(models.Recipes);
        Users.hasMany(models.Ingredients);
    };

    // User.beforeCreate(function (user) {
    //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    // })

    // User.beforeBulkUpdate(function (user) {
    //     if (user.attributes.password !== "" && user.attributes.password !== undefined && user.attributes.password !== null) {
    //         user.attributes.password = bcrypt.hashSync(user.attributes.password, bcrypt.genSaltSync(10), null);
    //     }
    // })

    return Users;
};