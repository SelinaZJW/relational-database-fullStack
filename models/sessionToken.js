const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class SessionToken extends Model {}

SessionToken.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'session_token'
})

module.exports = SessionToken