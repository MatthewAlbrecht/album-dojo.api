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

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
