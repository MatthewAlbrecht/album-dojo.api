module.exports = {
  up: async (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    await queryInterface.removeColumn('albums', 'releaseDate')
    await queryInterface.removeColumn('albums', 'releaseDatePrecision')
    return await queryInterface.renameColumn(
      'albums',
      'newReleaseDate',
      'releaseDate'
    )
  },

  down: async (queryInterface, Sequelize) => {
    // logic for reverting the changes
    await queryInterface.addColumn('albums', 'releaseDatePrecision')
  },
}
