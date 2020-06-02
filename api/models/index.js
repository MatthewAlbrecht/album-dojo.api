const { User } = require('./User')
const { Achievement } = require('./Achievement')
const { Album } = require('./Album')
const { AlbumGenre } = require('./AlbumGenre')
const { Action } = require('./Action')
const { Genre } = require('./Genre')
const { Level } = require('./Level')
const { List } = require('./List')
const { Role } = require('./Role')
const { Permission } = require('./Permission')
const { RolePermission } = require('./RolePermission')
const { ListUserAlbum } = require('./ListUserAlbum')
const { UserAchievement } = require('./UserAchievement')
const { UserAlbum } = require('./UserAlbum')
const { UserAction } = require('./UserAction')

User.belongsToMany(Achievement, {
  through: UserAchievement,
  foreignKey: { name: 'userId', allowNull: false },
})
User.hasMany(List, { foreignKey: { name: 'userId', allowNull: false } })
User.belongsToMany(Album, {
  through: UserAlbum,
  foreignKey: { name: 'userId', allowNull: false },
})
User.belongsToMany(Action, {
  through: UserAction,
  foreignKey: { name: 'userId', allowNull: false },
})
User.belongsTo(Role, { foreignKey: { name: 'role', allowNull: false } })

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: { name: 'roleName', allowNull: false },
})

Action.belongsToMany(User, {
  through: UserAction,
  foreignKey: { name: 'actionCode', allowNull: false },
})
Achievement.belongsToMany(User, {
  through: UserAchievement,
  foreignKey: { name: 'achievementCode', allowNull: false },
})
Album.belongsToMany(User, {
  through: UserAlbum,
  foreignKey: { name: 'albumId', allowNull: false },
})
Album.belongsToMany(Genre, {
  through: AlbumGenre,
  foreignKey: { name: 'albumId', allowNull: false },
})
Genre.belongsToMany(Album, {
  through: AlbumGenre,
  foreignKey: { name: 'genreId', allowNull: false },
})
Genre.belongsTo(Genre, { as: 'parentGenre', foreignKey: 'parentGenreId' })
List.belongsToMany(UserAlbum, {
  through: ListUserAlbum,
  foreignKey: { name: 'listId', allowNull: false },
})
Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: { name: 'permissionName', allowNull: false },
})
UserAlbum.belongsToMany(List, {
  through: ListUserAlbum,
  foreignKey: { name: 'userAlbumId', allowNull: false },
})

module.exports = {
  Achievement,
  Album,
  AlbumGenre,
  Action,
  Genre,
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
}
