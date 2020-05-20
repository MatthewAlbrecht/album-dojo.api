const { IDS } = require('../utils/seeds')
const userAlbumData = require('../utils/seeds/userAlbumData.json')

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'userAlbums',
      userAlbumData.map((userAlbum, index) => ({
        id: IDS.USER_ALBUMS[index],
        albumId: IDS.ALBUMS[index],
        userId: IDS.USER,
        listenDate: new Date(),
        updatedAt: new Date(),
        createdAt: new Date(),
        ...userAlbum,
      })),
      {}
    )
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('userAlbums', null, {})
  },
}
