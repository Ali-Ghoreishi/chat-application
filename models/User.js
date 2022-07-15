const { DataTypes } = require('sequelize');

const sequelize = require('../config/connect-db');

const User = sequelize.define('User', {
 // Model Attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: "User",
  })

// User.sync();              // force to create Table



module.exports = User