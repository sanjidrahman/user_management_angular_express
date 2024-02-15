const UsersModel = (sequelize, { DataTypes }) => {
    const Users = sequelize.define("User", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        isVerified: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Users;
};

module.exports = UsersModel;