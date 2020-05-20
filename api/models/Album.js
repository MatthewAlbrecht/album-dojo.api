const Sequelize = require('sequelize')

const sequelize = require('../../config/database')

const tableName = 'albums'

const Album = sequelize.define(
  'Album',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    spotifyId: {
      type: Sequelize.STRING,
    },
    isFeatured: {
      type: Sequelize.BOOLEAN,
    },
    spotifyData: {
      type: Sequelize.JSONB,
    },
  },
  { tableName }
)

module.exports = { Album }
