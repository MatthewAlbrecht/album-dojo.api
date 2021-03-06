const Sequelize = require('sequelize')
const bcryptSevice = require('../services/bcrypt.service')

const sequelize = require('../../config/database')
const { ROLES } = require('../../utils/constants')

const hooks = {
  beforeCreate(user) {
    user.password = bcryptSevice().password(user) // eslint-disable-line no-param-reassign
  },
}

const tableName = 'users'

const User = sequelize.define(
  'User',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: ROLES.USER,
    },
    spotifyId: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isAlphanumeric: true,
      },
    },
  },
  { hooks, tableName }
)

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get())

  delete values.password

  return values
}

module.exports = { User }
