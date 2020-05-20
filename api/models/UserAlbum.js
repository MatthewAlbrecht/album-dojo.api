const Sequelize = require('sequelize')

const sequelize = require('../../config/database')

const { User } = require('./User')
const { Album } = require('./Album')

const tableName = 'userAlbums'

const UserAlbum = sequelize.define(
  'UserAlbum',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    albumId: {
      type: Sequelize.UUID,
      references: {
        model: Album,
        key: 'id',
      },
      allowNull: false,
    },
    rating: {
      type: Sequelize.DECIMAL(2, 1),
    },
    listenDate: {
      type: Sequelize.DATEONLY,
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
  },
  { tableName }
)

module.exports = { UserAlbum }
