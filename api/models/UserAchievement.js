const Sequelize = require('sequelize')

const sequelize = require('../../config/database')

const { List } = require('./List')
const { UserAlbum } = require('./UserAlbum')

const tableName = 'userAchievements'

const UserAchievement = sequelize.define(
  'UserAchievement',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
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

module.exports = { UserAchievement }
