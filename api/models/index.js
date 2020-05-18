const { User } = require('./User');
const { Achievement } = require('./Achievement');
const { Album } = require('./Album');
const { Action } = require('./Action');
const { Level } = require('./Level');
const { List } = require('./List');
const { Role } = require('./Role');
const { Permission } = require('./Permission');
const { RolePermission } = require('./RolePermission');
const { ListUserAlbum } = require('./ListUserAlbum');
const { UserAchievement } = require('./UserAchievement');
const { UserAlbum } = require('./UserAlbum');
const { UserAction } = require('./UserAction');

// User.associate = (models) => {
User.belongsToMany(Achievement, { through: UserAchievement, foreignKey: { name: 'userId' } });
User.hasMany(List, { foreignKey: { name: 'userId' } });
User.belongsToMany(Album, { through: UserAlbum, foreignKey: { name: 'userId' } });
User.belongsToMany(Action, { through: UserAction, foreignKey: { name: 'userId' } });
// };

// Role.associate = (models) => {
Role.hasMany(User, { foreignKey: 'role' });
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: { name: 'roleName' } });
// };


// Action.associate = (models) => {
Action.belongsToMany(User, { through: UserAction, foreignKey: { name: 'actionCode' } });
// };

// Achievement.associate = (models) => {
Achievement.belongsToMany(User, { through: UserAchievement, foreignKey: { name: 'achievementCode' } });
// };

// Album.associate = (models) => {
Album.belongsToMany(User, { through: UserAlbum, foreignKey: { name: 'albumId' } });
// };

// List.associate = (models) => {
List.belongsToMany(UserAlbum, { through: ListUserAlbum, foreignKey: { name: 'listId' } });
// };

// Permission.associate = (models) => {
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: { name: 'permissionName' } });
// };

// UserAlbum.associate = (models) => {
UserAlbum.belongsToMany(List, { through: ListUserAlbum, foreignKey: { name: 'userAlbumId' } });
// };

const Models = {
  Achievement,
  Album,
  Action,
  Level,
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

// Object.keys(Models).forEach((key) => {
//   if ('associate' in Models[key]) {
//     Models[key].associate(Models);
//   }
// });


module.exports = Models;
