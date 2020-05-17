const {
  createAlbum,
  updateAlbum,
  deleteAlbum,
} = require('./AlbumMutation');

const {
  createUser,
  updateUser,
  deleteUser,
} = require('./UserMutation');

const {
  createUserAlbum,
  updateUserAlbum,
  deleteUserAlbum,
} = require('./UserAlbumMutation');

const {
  createAchievement,
  updateAchievement,
  deleteAchievement,
} = require('./AchievementMutation');

const {
  createAction,
  updateAction,
  deleteAction,
} = require('./ActionMutation');

const {
  createList,
  updateList,
  deleteList,
} = require('./ListMutation');

const {
  createListUserAlbum,
  updateListUserAlbum,
  deleteListUserAlbum,
} = require('./ListUserAlbumMutation');

const {
  createPermission,
  updatePermission,
  deletePermission,
} = require('./PermissionMutation');

const {
  createRolePermission,
  deleteRolePermission,
} = require('./RolePermissionMutation');

const {
  createRole,
  updateRole,
  deleteRole,
} = require('./RoleMutation');

const {
  createUserAchievement,
  deleteUserAchievement,
} = require('./UserAchievementMutation');

const {
  createUserAction,
  deleteUserAction,
} = require('./UserActionMutation');

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  createUserAlbum,
  updateUserAlbum,
  deleteUserAlbum,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  createAction,
  updateAction,
  deleteAction,
  createList,
  updateList,
  deleteList,
  createListUserAlbum,
  updateListUserAlbum,
  deleteListUserAlbum,
  createPermission,
  updatePermission,
  deletePermission,
  createRolePermission,
  deleteRolePermission,
  createRole,
  updateRole,
  deleteRole,
  createUserAchievement,
  deleteUserAchievement,
  createUserAction,
  deleteUserAction,
};
