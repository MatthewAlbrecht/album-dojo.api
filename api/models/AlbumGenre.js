const Sequelize = require('sequelize')
const sequelize = require('../../config/database')

const tableName = 'albumGenres'

const AlbumGenre = sequelize.define(
  'AlbumGenre',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  },
  { tableName }
)

module.exports = { AlbumGenre }
