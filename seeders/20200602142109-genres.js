const genreData = require('../utils/seeds/genreData.json')
const { IDS } = require('../utils/seeds')

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'genres',
      genreData.map(genre => ({
        ...genre,
        id: IDS.RANDOM(),
        updatedAt: new Date(),
        createdAt: new Date(),
      })),
      {}
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('genres', null, {})
  },
}
