const { User } = require('./User');
const { Achievement } = require('./Achievement');
const { Album } = require('./Album');
const { Badge } = require('./Badge');
const { List } = require('./List');
const { ListUserAlbum } = require('./ListUserAlbum');
const { UserAchievement } = require('./UserAchievement');
const { UserAlbum } = require('./UserAlbum');
const { UserBadge } = require('./UserBadge');

User.belongsToMany(Achievement, { through: UserAchievement, foreignKey: { name: 'userId' } });
Achievement.belongsToMany(User, { through: UserAchievement, foreignKey: { name: 'achievementId' } });
User.belongsToMany(Album, { through: UserAlbum, foreignKey: { name: 'userId' } });
Album.belongsToMany(User, { through: UserAlbum, foreignKey: { name: 'albumId' } });
User.belongsToMany(Badge, { through: UserBadge, foreignKey: { name: 'userId' } });
Badge.belongsToMany(User, { through: UserBadge, foreignKey: { name: 'badgeId' } });
List.belongsToMany(UserAlbum, { through: ListUserAlbum, foreignKey: { name: 'listId' } });
User.hasMany(List);
UserAlbum.belongsToMany(List, { through: ListUserAlbum, foreignKey: { name: 'userAlbumId' } });

module.exports = {
  Achievement,
  Album,
  Badge,
  List,
  ListUserAlbum,
  User,
  UserAchievement,
  UserAlbum,
  UserBadge,
};
