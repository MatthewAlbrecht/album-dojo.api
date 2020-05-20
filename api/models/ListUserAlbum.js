const Sequelize = require('sequelize')

const sequelize = require('../../config/database')

const tableName = 'listUserAlbums'

const ListUserAlbum = sequelize.define(
  'ListUserAlbum',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    rank: {
      type: Sequelize.INTEGER,
      unique: true,
    },
  },
  { tableName }
)

module.exports = { ListUserAlbum }
