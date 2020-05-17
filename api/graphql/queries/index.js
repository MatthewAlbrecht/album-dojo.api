const { achievementQuery } = require('./AchievementQuery');
const { actionQuery } = require('./ActionQuery');
const { albumQuery } = require('./AlbumQuery');
const { listQuery } = require('./ListQuery');
const { listUserAlbumQuery } = require('./ListUserAlbumQuery');
const { permissionQuery } = require('./PermissionQuery');
const { rolePermissionQuery } = require('./RolePermissionQuery');
const { roleQuery } = require('./RoleQuery');
const { userAchievementQuery } = require('./UserAchievementQuery');
const { userActionQuery } = require('./UserActionQuery');
const { userAlbumQuery } = require('./UserAlbumQuery');
const { userQuery } = require('./UserQuery');

module.exports = {
  achievementQuery,
  actionQuery,
  albumQuery,
  listQuery,
  listUserAlbumQuery,
  permissionQuery,
  rolePermissionQuery,
  roleQuery,
  userAchievementQuery,
  userActionQuery,
  userAlbumQuery,
  userQuery,
};
