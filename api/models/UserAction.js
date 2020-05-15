const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const { User } = require('./User');
const { Action } = require('./Action');
const { List } = require('./List');
const { UserAlbum } = require('./UserAlbum');

const tableName = 'userActions';

const UserAction = sequelize.define('UserAction', {
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
  actionCode: {
    type: Sequelize.STRING,
    references: {
      model: Action,
      key: 'code',
    },
    allowNull: false,
  },
  achievementCode: {
    type: Sequelize.STRING,
    references: {
      model: Action,
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
}, { tableName });

module.exports = { UserAction };
