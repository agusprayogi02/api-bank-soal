const sequelize = require('./model.js')
const {DataTypes} = require('sequelize')

const Tutorial = sequelize.define('tutorial', {
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  published: {
    type: DataTypes.BOOLEAN,
  },
})

module.exports = Tutorial
