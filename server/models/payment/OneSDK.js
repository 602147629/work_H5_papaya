
module.exports = function(sequelize, DataTypes) {
    var OneSDK = sequelize.define(
        // modelName
        'onesdk',

        // attributes
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            app: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            cbi: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            ct: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0
            },
            fee: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            pt: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0
            },
            sdk: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            ssid: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            st: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            tcd: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            uid: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            ver: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "1"
            }
        },

        // options
        {
            tableName: "onesdk",
            timestamps: true,
            validate: {

            }
        }
    );

    return OneSDK;
};