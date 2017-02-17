
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define(
        // modelName
        'user',

        // attributes
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            account: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: ""
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: "1"
            },
            token: {
                type: DataTypes.STRING(36),
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },
            nickName: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: "小木瓜"
            },
            udid: {
                type: DataTypes.STRING(36),
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },
            ag: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: ""
            },
            currency: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: ""
            },
            balance: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            trial: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            }
        },

        // options
        {
            timestamps: true
        }
    );

    return User;
};
