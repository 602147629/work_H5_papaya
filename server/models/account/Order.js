
module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define(
        // modelName
        'order',

        // attributes
        {
            orderID: {
                type: DataTypes.STRING(36),
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            shortID: {
                type: DataTypes.STRING(36),
                allowNull: false
            },
            uuid: {
                type: DataTypes.STRING(36),
                allowNull: false,
                defaultValue: ""
            },
            udid: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            appID: {
                type: DataTypes.STRING(50),
                allowNull: false,
                defaultValue: ""
            },
            platformID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            channelID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            channelSDK: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: ""
            },
            channelOrderID: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: ""
            },
            channelOrderTime: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW
            },
            currency: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            extension: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: ""
            },
            money: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            realMoney: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            state: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            userID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            roleID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            roleName: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            serverID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            serverName: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            productID: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            productPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            productName: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            productDesc: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            notifyUrl: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            createTime: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            completeTime: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },

        // options
        {
            timestamps: true,
            createdAt: "createTime",
            updatedAt: "completeTime"
        }
    );

    return Order;
};
