const { IDS } = require('../utils/seeds');
const albumData = require('../utils/seeds/albumData.json');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('albums', albumData.map((album, index) => ({
      id: IDS.ALBUMS[index],
      ...album,
      spotifyData: JSON.stringify(album.spotifyData),
      updatedAt: new Date(),
      createdAt: new Date(),
    })), {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('albums', null, {});
  },
};
