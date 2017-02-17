
module.exports = function(sequelize, DataTypes) {
    var cc52 = sequelize.define(
        // modelName
        'cc52',

        // attributes
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            orderid: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            productname: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },
            amount: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },
            roleid: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            serverid: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            appid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            paytime: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            remarks: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            }
        },

        // options
        {
            tableName: "cc52",
            timestamps: true,
            validate: {
                
            }
        }
    );

    return cc52;
};
