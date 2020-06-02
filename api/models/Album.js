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
      unique: true,
    },
    artists: {
      type: Sequelize.JSONB,
    },
    images: {
      type: Sequelize.JSONB,
    },
    name: {
      type: Sequelize.STRING,
    },
    releaseDate: {
      type: Sequelize.DATEONLY,
    },
    totalTracks: {
      type: Sequelize.INTEGER,
    },
    durationInMs: {
      type: Sequelize.INTEGER,
    },
    tracks: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    duplicateSpotifyIds: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
  },
  { tableName }
)

module.exports = { Album }
