const { User } = require('./User')
const { Achievement } = require('./Achievement')
const { Album } = require('./Album')
const { Action } = require('./Action')
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
  foreignKey: { name: 'userId' },
})
User.hasMany(List, { foreignKey: { name: 'userId' } })
User.belongsToMany(Album, {
  through: UserAlbum,
  foreignKey: { name: 'userId' },
})
User.belongsToMany(Action, {
  through: UserAction,
  foreignKey: { name: 'userId' },
})
User.belongsTo(Role, { foreignKey: 'role' })

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: { name: 'roleName' },
})

Action.belongsToMany(User, {
  through: UserAction,
  foreignKey: { name: 'actionCode' },
})
Achievement.belongsToMany(User, {
  through: UserAchievement,
  foreignKey: { name: 'achievementCode' },
})
Album.belongsToMany(User, {
  through: UserAlbum,
  foreignKey: { name: 'albumId' },
})
List.belongsToMany(UserAlbum, {
  through: ListUserAlbum,
  foreignKey: { name: 'listId' },
})
Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: { name: 'permissionName' },
})
UserAlbum.belongsToMany(List, {
  through: ListUserAlbum,
  foreignKey: { name: 'userAlbumId' },
})

module.exports = {
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
}
