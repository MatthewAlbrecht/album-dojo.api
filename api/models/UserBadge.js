const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const { User } = require('./User');
const { Badge } = require('./Badge');
const { List } = require('./List');
const { UserAlbum } = require('./UserAlbum');

const tableName = 'userBadge';

const UserBadge = sequelize.define('UserBadge', {
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
  badgeId: {
    type: Sequelize.UUID,
    references: {
      model: Badge,
      key: 'id',
    },
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
}, { tableName });

module.exports = { UserBadge };
