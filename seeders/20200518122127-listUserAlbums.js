const { IDS } = require('../utils/seeds');
const listUserAlbumData = require('../utils/seeds/listUserAlbumData.json');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('listUserAlbums', listUserAlbumData.map((listUserAlbum, index) => ({
      id: IDS.LIST_USER_ALBUMS[index],
      userAlbumId: IDS.USER_ALBUMS[index],
      listId: IDS.LIST,
      updatedAt: new Date(),
      createdAt: new Date(),
      ...listUserAlbum,
    })), {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('listUserAlbums', null, {});
  },
};
