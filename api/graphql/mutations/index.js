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
};
