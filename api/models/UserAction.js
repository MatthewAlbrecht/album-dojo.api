const Sequelize = require('sequelize')

const sequelize = require('../../config/database')

const { Achievement } = require('./Achievement')
const { List } = require('./List')
const { UserAlbum } = require('./UserAlbum')

const tableName = 'userActions'

const UserAction = sequelize.define(
  'UserAction',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    achievementCode: {
      type: Sequelize.STRING,
      references: {
        model: Achievement,
        key: 'code',
      },
    },
    listId: {
      type: Sequelize.UUID,
      references: {
        model: List,
        key: 'id',
      },
    },
    userAlbumId: {
      type: Sequelize.UUID,
      references: {
        model: UserAlbum,
        key: 'id',
      },
    },
  },
  { tableName }
)

module.exports = { UserAction }
