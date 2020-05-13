const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const { User } = require('./User');
const { Achievement } = require('./Achievement');
const { List } = require('./List');
const { UserAlbum } = require('./UserAlbum');

const tableName = 'userAchievements';

const UserAchievement = sequelize.define('UserAchievement', {
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
  achievementId: {
    type: Sequelize.UUID,
    references: {
      model: Achievement,
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
  points: {
    type: Sequelize.INTEGER,
  },
}, { tableName });

module.exports = { UserAchievement };
