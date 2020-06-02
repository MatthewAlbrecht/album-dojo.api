const {
  createAlbum,
  createAlbumById,
  createAlbumsByPlaylist,
  updateAlbum,
  deleteAlbum,
} = require('./AlbumMutation')

const {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require('./UserMutation')

const { createGenre, updateGenre, deleteGenre } = require('./GenreMutation')

const {
  createAlbumGenre,
  updateAlbumGenre,
  deleteAlbumGenre,
} = require('./AlbumGenreMutation')

const {
  createUserAlbum,
  updateUserAlbum,
  deleteUserAlbum,
} = require('./UserAlbumMutation')

const {
  createAchievement,
  updateAchievement,
  deleteAchievement,
} = require('./AchievementMutation')

const { createAction, updateAction, deleteAction } = require('./ActionMutation')

const { createList, updateList, deleteList } = require('./ListMutation')

const {
  createListUserAlbum,
  updateListUserAlbum,
  deleteListUserAlbum,
} = require('./ListUserAlbumMutation')

const {
  createPermission,
  updatePermission,
  deletePermission,
} = require('./PermissionMutation')

const {
  createRolePermission,
  deleteRolePermission,
} = require('./RolePermissionMutation')

const { createRole, updateRole, deleteRole } = require('./RoleMutation')

const {
  createUserAchievement,
  deleteUserAchievement,
} = require('./UserAchievementMutation')

const { createUserAction, deleteUserAction } = require('./UserActionMutation')

module.exports = {
  createAchievement,
  createAction,
  createAlbum,
  createAlbumById,
  createAlbumGenre,
  createAlbumsByPlaylist,
  createGenre,
  createList,
  createListUserAlbum,
  createPermission,
  createRole,
  createRolePermission,
  createUser,
  createUserAchievement,
  createUserAction,
  createUserAlbum,
  deleteAchievement,
  deleteAction,
  deleteAlbum,
  deleteAlbumGenre,
  deleteGenre,
  deleteList,
  deleteListUserAlbum,
  deletePermission,
  deleteRole,
  deleteRolePermission,
  deleteUser,
  deleteUserAchievement,
  deleteUserAction,
  deleteUserAlbum,
  loginUser,
  updateAchievement,
  updateAction,
  updateAlbum,
  updateAlbumGenre,
  updateGenre,
  updateList,
  updateListUserAlbum,
  updatePermission,
  updateRole,
  updateUser,
  updateUserAlbum,
}
