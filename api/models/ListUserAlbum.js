const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const { UserAlbum } = require('./UserAlbum');
const { List } = require('./List');

const tableName = 'listUserAlbums';

const ListUserAlbum = sequelize.define('ListUserAlbum', {
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
    allowNull: false,
  },
  userAlbumId: {
    type: Sequelize.UUID,
    references: {
      model: UserAlbum,
      key: 'id',
    },
    allowNull: false,
  },
  rank: {
    type: Sequelize.INTEGER,
    unique: true,
  },
}, { tableName });

module.exports = { ListUserAlbum };
