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
};
