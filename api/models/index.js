const Sequelize = require('sequelize');
const { User } = require('./User');
const { Achievement } = require('./Achievement');
const { Album } = require('./Album');
const { Action } = require('./Action');
const { List } = require('./List');
const { Role } = require('./Role');
const { Permission } = require('./Permission');
const { RolePermission } = require('./RolePermission');
const { ListUserAlbum } = require('./ListUserAlbum');
const { UserAchievement } = require('./UserAchievement');
const { UserAlbum } = require('./UserAlbum');
const { UserAction } = require('./UserAction');

User.belongsToMany(Achievement, { through: UserAchievement, foreignKey: { name: 'userId' } });
Achievement.belongsToMany(User, { through: UserAchievement, foreignKey: { name: 'achievementId' } });
User.belongsToMany(Album, { through: UserAlbum, foreignKey: { name: 'userId' } });
Album.belongsToMany(User, { through: UserAlbum, foreignKey: { name: 'albumId' } });
User.belongsToMany(Action, { through: UserAction, foreignKey: { name: 'userId' } });
Role.hasMany(User, { foreignKey: 'role' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: { name: 'permissionName', references: { key: 'name' } } });
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: { name: 'roleName', references: { key: 'name' } } });
Action.belongsToMany(User, { through: UserAction, foreignKey: { name: 'actionId' } });
List.belongsToMany(UserAlbum, { through: ListUserAlbum, foreignKey: { name: 'listId' } });
User.hasMany(List);
UserAlbum.belongsToMany(List, { through: ListUserAlbum, foreignKey: { name: 'userAlbumId' } });

module.exports = {
  Achievement,
  Album,
  Action,
  List,
  ListUserAlbum,
  Permission,
  Role,
  RolePermission,
  User,
  UserAchievement,
  UserAlbum,
  UserAction,
};
